import { UnorderedListOutlined, ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { Breadcrumb, Space, Button, Card, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAlbums } from '../../../helpers/album';
import { useGetAllAlbumForUser, useGetUserById } from '../../../helpers/user';
import Table, { ColumnsType } from 'antd/es/table';
import { Album } from '../../../constants/types/album';
import usePagination from '../../../hook/usePagination';
import { useGetAvatarForUser } from '../../../helpers/avatar';

const { Title } = Typography;

const UserDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: userDetail } = useGetUserById(Number(id));
    const { data: userData } = useGetAllAlbumForUser();
    const { pagination, onPaginationChange } = usePagination<Album>({});
    const { data } = useGetAlbums(pagination);
    const navigate = useNavigate();
    const { data: userAvatars } = useGetAvatarForUser(userDetail?.name ?? 'Random');


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
            width: 200,
        },
        {
            title: 'Action',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (_, record: Album) => (
                <Button
                    type='default'
                    onClick={() => navigate(`/albums/${record.id}`)}
                    icon={<EyeOutlined />}
                    size='small'
                >
                    Show
                </Button>
            )
        },
    ];

    return (
        <div style={{ padding: '1rem 2rem', backgroundColor: '#f0f2f5' }}>
            <Breadcrumb
                items={[
                    {
                        href: '/users',
                        title: (
                            <>
                                <UnorderedListOutlined />
                                <span>Users</span>
                            </>
                        ),
                    },
                    {
                        title: 'Show',
                    },
                ]}
            />

            <Space direction="vertical" style={{ width: '100%', marginTop: '1rem' }}>
                <div style={{ display: 'flex' }}>
                    <Button
                        type='text'
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/users')}
                        style={{ marginBottom: '1rem' }}
                    />
                    <Title level={4} style={{ marginTop: '0' }}>Show user</Title>
                </div>

                <Card
                    title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0rem' }}>
                            <img
                                src={userAvatars}
                                alt={`${userDetail?.name}`}
                            />
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    {userDetail?.name}
                                </div>
                                <a href={`mailto:${userDetail?.email}`} style={{ fontWeight: 'normal' }}>{userDetail?.email}</a>
                            </div>
                        </div>
                    }
                    style={{ width: '100%' }}
                    bodyStyle={{ padding: '1rem' }}
                >
                    <Title level={4} style={{ marginTop: '0' }}>Albums</Title>
                    <Table
                        bordered
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
                        style={{ width: '100%' }}
                    />
                </Card >
            </Space >
        </div >
    );
};

export default UserDetailPage;
