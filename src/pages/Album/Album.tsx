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
import { useGetAllUser } from '../../helpers/user';

const AlbumPage = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedRecord, setSelectedRecord] = useState<Album | null>();

    const { pagination, onPaginationChange } = usePagination<Album>({});

    const { data } = useGetAlbums(pagination);

    const onOpenModal = () => setIsOpenModal(true);
    const { data: userData } = useGetAllUser();
    const [userMap, setUserMap] = useState<Record<number, string>>({});

    const navigate = useNavigate();

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
            title: 'Title',
            dataIndex: 'title',
            width: 120,
        },
        {
            title: 'User',
            dataIndex: 'userId',
            width: 120,
            render: (id) => userMap[id],
        },
        {
            title: 'Action',
            align: 'center',
            fixed: 'right',
            width: 50,
            render: (_, record: Album) => {
                return (
                    <Flex justify='center'>
                        <Button type='default' onClick={() => {
                            navigate(`/albums/${record.id}`)
                        }}
                            icon={<EyeOutlined />}
                            size='small'
                        >Show</Button>
                    </Flex>
                )
            }
        },
    ]

    useEffect(() => {
        if (userData && userData) {
            const userMap = (userData as User[]).reduce((acc: Record<number, string>, user: User) => {
                if (user.id) {
                    acc[user.id] = user.name || 'Unknown';
                }
                return acc;
            }, {});
            setUserMap(userMap);
        }
    }, [userData]);




    return (
        <>
            <Space direction='vertical' style={{ width: '100%', padding: '1rem' }}>
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={data?.map((album: any) => ({
                        ...album,
                        key: album.id,
                    })) || []}
                    pagination={{
                        current: pagination.pageNum,
                        total: data?.totalElements || 0,
                        pageSize: pagination.pageSize,
                        onChange: onPaginationChange,
                    }}
                    loading={!data}
                />
            </Space>
            {/* <Modal
                title="Album Details"
                open={isOpenModal}
                onCancel={onCloseModal}
                onOk={onCloseModal}
            >
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={data?.map((album: any) => ({
                        ...album,
                        key: album.id,
                    })) || []}
                    loading={!data}
                />
            </Modal> */}
        </>
    )
}

export default AlbumPage
