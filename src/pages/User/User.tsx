import { Button, Flex, Modal, Space, theme } from 'antd'
import { useEffect, useState } from 'react'
import Table, { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import './style.css'
import { Album } from '../../constants/types/album';
import usePagination from '../../hook/usePagination';
import { useGetAlbums } from '../../helpers/album';
import { User } from '../../constants/types/user';
import { useNavigate } from 'react-router-dom';
import { useGetAllAlbumForUser, useGetAllUsers } from '../../helpers/user';
import Title from 'antd/es/typography/Title';

const UserPage = () => {
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const { pagination, onPaginationChange } = usePagination<Album>({});
    const { data } = useGetAllUsers(pagination);
    const { data: albumData } = useGetAlbums();
    const { data: userData } = useGetAllAlbumForUser();

    const onOpenModal = (userId: number) => {
        setSelectedUserId(userId);
        setIsOpenModal(true);
    };

    const onCloseModal = () => {
        setSelectedUserId(null);
        setIsOpenModal(false);
    };

    const AlbumColumn: ColumnsType<Album> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
            align: 'center',
            render: (_, __, index) => {
                const { pageNum = 1, pageSize = 10 } = pagination || {};
                return (pageNum - 1) * pageSize + index + 1;
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 120,
        },
        {
            title: 'User',
            dataIndex: 'userId',
            width: 120,
            render: (id, _, ___) => {
                const user = (userData as User[]).find(user => user.id === id);
                return user?.name || 'Unknown';
            },
        },
        {
            title: 'Action',
            fixed: 'right',
            width: 50,
            render: (_, record: Album) => {
                return (
                    <Flex justify='center'>
                        <Button type='default' onClick={() => {
                            navigate(`/users/${record.id}`)
                        }}
                            icon={<EyeOutlined />}
                            size='small'
                        >Show</Button>
                    </Flex>
                )
            }
        },
    ]

    const columns: ColumnsType<Album> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
            align: 'center',
            render: (_, __, index) => {
                const { pageNum = 1, pageSize = 10 } = pagination || {};
                return (pageNum - 1) * pageSize + index + 1;
            }
        },
        {
            title: 'Avatar',
            dataIndex: 'id',
            width: 50,
            align: 'center',
            render: (id: number) => {
                const user = userData?.find((user: User) => user.id === id);
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Unknown')}&background=random&rounded=true`;
                return (
                    <div >
                        <img
                            src={avatarUrl}
                            alt={user?.name}
                            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
                        />
                    </div>
                );
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 120,
        },
        {
            title: 'Email',
            dataIndex: 'id',
            width: 200,
            render: (userId: number) => {
                const user = userData?.find((user: User) => user.id === userId);
                return (
                    <a href={`mailto:${user?.email}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                        {user?.email || 'Unknown'}
                    </a>
                );
            },
        },
        {
            title: 'Phone',
            dataIndex: 'id',
            width: 120,
            render: (id: number) => {
                const user = data?.find((user: User) => user.id === id);
                return (
                    <a href={`tel:${user?.phone}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                        {user?.phone || 'Unknown'}
                    </a>
                );
            },
        },
        {
            title: 'Website',
            dataIndex: 'id',
            width: 120,
            render: (id: number) => {
                const user = userData?.find((user: User) => user.id === id);
                const websiteUrl = user?.website?.startsWith('http') ? user?.website : `http://${user?.website}`;

                return (
                    <a href={websiteUrl} style={{ color: '#007bff', textDecoration: 'none' }} target="_blank">
                        {user?.website || 'Unknown'}
                    </a>
                );
            },
        },
        {
            title: 'Action',
            fixed: 'right',
            align: 'center',
            width: 50,
            render: (_, record: User) => {
                return (
                    <Flex justify='center'>
                        <Button
                            type='default'
                            onClick={() => onOpenModal(record.id ?? 1)}
                            icon={<EyeOutlined />}
                            size='small'
                        >
                            Show
                        </Button>
                    </Flex>
                );
            }
        },
    ]

    return (
        <>
            <Space direction='vertical' style={{ width: '100%', padding: '1rem' }}>
                <Title level={3}> Users</Title>
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={data || []}
                    pagination={{
                        current: pagination.pageNum,
                        total: data?.totalElements || 0,
                        pageSize: pagination.pageSize,
                        onChange: onPaginationChange,
                    }}
                    loading={!data}
                />
            </Space>
            <Modal
                title="Albums"
                open={isOpenModal}
                footer={[
                    <Button key="submit" type="default" onClick={() => onCloseModal()}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => navigate(`/users/${selectedUserId}`)}>
                        View details
                    </Button>,
                ]}
            >
                <Table
                    bordered={true}
                    columns={AlbumColumn}
                    dataSource={albumData?.slice(0, 10).map((album: any) => ({
                        ...album,
                        key: album.id,
                    })) || []}
                    loading={!albumData}
                    pagination={false}
                />

            </Modal>
        </>
    )
}

export default UserPage
