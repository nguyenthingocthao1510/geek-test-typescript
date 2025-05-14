import { Button, Flex, Space, Table, theme } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Album } from '../../constants/types/album';
import { User } from '../../constants/types/user';
import { useGetAlbums } from '../../helpers/album';
import { useGetAllAlbumForUser } from '../../helpers/user';
import usePagination from '../../hook/usePagination';
import './style.css';
import { ColumnsType } from 'antd/es/table';

const AlbumPage = () => {
    const { pagination, onPaginationChange } = usePagination<Album>({});
    const { data: albumsData } = useGetAlbums(pagination);
    const { data: userData } = useGetAllAlbumForUser();

    const navigate = useNavigate();

    const columns: ColumnsType<Album> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
            align: 'center',
            render: (_: any, __: any, index: number) => {
                const { pageNum = 1, pageSize = 10 } = pagination || {};
                return (pageNum - 1) * pageSize + index + 1;
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 200,
        },
        {
            title: 'User',
            dataIndex: 'userId',
            width: 200,
            render: (id: number) => {
                const user = userData?.find((user: User) => user.id === id);
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Unknown')}&background=random&rounded=true`;

                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={avatarUrl}
                            alt={user?.name}
                            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
                        />
                        <a href={`/users/${user?.id}`} style={{ textDecoration: 'none', color: '#1890ff' }}>
                            {user?.name || 'Unknown'}
                        </a>
                    </div>
                );
            },
        },
        {
            title: 'Action',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (_: any, record: Album) => (
                <Flex justify="center">
                    <Button
                        type="default"
                        onClick={() => navigate(`/albums/${record.id}`)}
                        icon={<EyeOutlined />}
                        size="small"
                    >
                        Show
                    </Button>
                </Flex>
            ),
        },
    ];

    return (
        <Space direction="vertical" style={{ width: '100%', padding: '1rem' }}>
            <Title level={3}>Albums</Title>
            <Table
                bordered
                columns={columns}
                dataSource={albumsData?.map((album: Album) => ({
                    ...album,
                    key: album.id,
                })) || []}
                pagination={{
                    current: pagination.pageNum,
                    total: albumsData?.totalElements || 0,
                    pageSize: pagination.pageSize,
                    onChange: onPaginationChange,
                }}
                loading={!albumsData}
            />
        </Space>
    );
};

export default AlbumPage;
