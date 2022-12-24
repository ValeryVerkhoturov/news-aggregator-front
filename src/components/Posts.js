import { useState } from "react";
import {ImageList, ImageListItem, Pagination, Typography} from "@mui/material";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import {createTheme, ThemeProvider} from "@mui/material/styles";


const theme = createTheme();

function Posts() {

    const [posts, setPosts] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const postsPerPage = 1;

    useState(async () => {
        const response = await fetch(`http://localhost:1337/api/vk-com-mirea-official-posts?pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${postsPerPage}&populate=%2A`);
        const data = await response.json();
        setPosts(data.data);
        setTotalPages(data.meta.pagination.pageCount);
    });

    const handleChange = async (event, value) => {
        setPage(value);
        const response = await fetch(`http://localhost:1337/api/vk-com-mirea-official-posts?pagination%5Bpage%5D=${value}&pagination%5BpageSize%5D=${postsPerPage}&populate=%2A`);
        const data = await response.json();
        setTotalPages(data.meta.pagination.pageCount);
        setPosts(data.data);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Посты ВК
                    </Typography>
                    <ul>
                        {posts.map((item) => (
                            <li key={item.id}>
                                <Typography variant="h5" gutterBottom>
                                    {"Пост от "}{new Date(item.attributes.postDate).toLocaleDateString()}
                                </Typography>
                                <p>{item.attributes.text}</p>
                                <ImageList cols={2}>
                                    {item.attributes.mediaLink.map((item) => (
                                        <ImageListItem key={item.id}>
                                            <img
                                                src={item.link}
                                                srcSet={item.link}
                                                alt={item.id}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </li>
                        ))}
                    </ul>
                    <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" margin="auto"/>
                </main>
            </Container>
            <Footer />
        </ThemeProvider>
    );
}

export default Posts;