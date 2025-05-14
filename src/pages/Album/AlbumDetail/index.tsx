import { useNavigate, useParams } from 'react-router-dom';
import { useGetAlbumById, useGetAlbums } from '../../../helpers/album';
import { Breadcrumb, Button, Card, Flex, Space } from 'antd';
import { ArrowLeftOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useGetUserById } from '../../../helpers/user';
import { Image } from 'antd';
import Title from 'antd/es/typography/Title';

const AlbumDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: albumDetail } = useGetAlbumById(Number(id));
    const { data: userDetail } = useGetUserById(Number(id));
    const { data: albums } = useGetAlbums();

    const navigate = useNavigate();

    return (
        <div style={{ marginTop: '1rem', marginLeft: '2rem', marginBottom: '5.5rem' }}>
            <div>
                <Breadcrumb
                    items={[
                        {
                            href: '/albums',
                            title: (
                                <>
                                    <UnorderedListOutlined />
                                    <span>Album</span>
                                </>
                            ),
                        },
                        {
                            title: 'Show',
                        },
                    ]}
                />
            </div>
            <Space direction='horizontal' style={{ margin: '0.5rem 0rem' }}>
                <Button type='text' icon={<ArrowLeftOutlined />} style={{ marginBottom: '10px' }} onClick={() => navigate('/albums')}></Button>
                <Title level={2} style={{ marginLeft: '-6px', marginTop: '0' }}>Show album</Title>
            </Space >
            <br></br>
            <Space direction="vertical" style={{ background: 'white', width: '75rem', height: '24rem', margin: '0rem 2rem' }}>
                <Card title={
                    <div style={{ height: '5rem', display: 'flex', alignItems: 'center' }}>
                        <Space direction='horizontal'>
                            <Space>
                                Icon
                            </Space>
                            <Space direction='vertical' >
                                <span style={{ fontWeight: 'bold' }}>{userDetail?.name}</span>
                                <span style={{ fontWeight: 'normal' }}>
                                    {userDetail?.email}
                                </span>
                            </Space>
                        </Space>
                    </div>
                } style={{ width: 1150, margin: '1rem 2rem', height: 350 }}>
                    <Title style={{ marginTop: '0' }} level={4}>{albumDetail?.title}</Title>
                    <Flex wrap gap='large' style={{ marginTop: '3rem' }}>
                        <Image.PreviewGroup>
                            {
                                albums
                                    ?.filter((album: any) => album.userId === userDetail?.id)
                                    .map((album: any) => (
                                        <Image
                                            key={album.id}
                                            src={`album.title`}
                                            alt={album.title}
                                            width={200}
                                            style={{ borderRadius: '8px', marginBottom: '8px' }}
                                        />
                                    ))
                            }
                        </Image.PreviewGroup>
                    </Flex>

                </Card>
            </Space>

        </div >
    );
};

export default AlbumDetailPage;
