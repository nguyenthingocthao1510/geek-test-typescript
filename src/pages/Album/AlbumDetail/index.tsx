import { useNavigate, useParams } from 'react-router-dom';
import { useGetAlbumById, useGetAlbums } from '../../../helpers/album';
import { Breadcrumb, Button, Card, Space, Image, Typography } from 'antd';
import { ArrowLeftOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useGetUserById } from '../../../helpers/user';
import { useGetAvatarForUser } from '../../../helpers/avatar';

const { Title } = Typography;

const AlbumDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: albumDetail } = useGetAlbumById(Number(id));
    const { data: userDetail } = useGetUserById(Number(id));
    const { data: albums } = useGetAlbums();
    const { data: userAvatars } = useGetAvatarForUser(userDetail?.name ?? 'Random');

    return (
        <div style={{ padding: '1rem 2rem', backgroundColor: '#f0f2f5', marginBottom: '11.9rem' }} >
            <Breadcrumb
                items={[
                    {
                        href: '/albums',
                        title: (
                            <>
                                <UnorderedListOutlined />
                                <span>Albums</span>
                            </>
                        ),
                    },
                    {
                        title: 'Show',
                    },
                ]}
                style={{ marginBottom: '1rem' }}
            />

            <Space direction="horizontal" style={{ marginBottom: '1rem' }}>
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/albums')}
                />
                <Title level={4} style={{ margin: 0 }}>
                    Show Album
                </Title>
            </Space>

            <Card
                title={
                    <Space style={{ margin: '1rem 0rem' }}>
                        <img
                            src={userAvatars}
                            alt={`${userDetail?.name}`}
                        />
                        <div>
                            <Title level={4} style={{ margin: 0 }}>
                                <a href={`/users/${userDetail?.id}`} style={{ textDecoration: 'none', color: '#1890ff' }}>
                                    {userDetail?.name || 'Unknown'}
                                </a>
                            </Title>
                            <a href={`mailto:${userDetail?.email || ''}`} style={{ fontWeight: 'normal' }}>
                                {userDetail?.email || 'No Email'}
                            </a>
                        </div>
                    </Space>
                }
                style={{ backgroundColor: 'white' }}
                bodyStyle={{ padding: '1.5rem' }}
            >
                <Title level={3} style={{ marginTop: '0' }}>{albumDetail?.title}</Title>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                    <Image.PreviewGroup>
                        {albums
                            ?.filter((album: any) => album.userId === userDetail?.id)
                            .map((album: any) => (
                                <Image
                                    key={album.id}
                                    src={album.thumbnailUrl}
                                    alt={album.title}
                                    width={150}
                                    style={{ borderRadius: '8px', margin: '8px' }}
                                    preview={{
                                        src: album.url,
                                    }}
                                />
                            ))}
                    </Image.PreviewGroup>
                </div>
            </Card >
        </div >
    );
};

export default AlbumDetailPage;
