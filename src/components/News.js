import { useState } from "react";
import {ImageList, ImageListItem, Pagination, Typography} from "@mui/material";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import MuiMarkdown from "mui-markdown";


const theme = createTheme();

function News() {

    const [news, setNews] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const newsPerPage = 2;

    useState(async () => {
        const response = await fetch(`http://localhost:1337/api/mirea-ru-news-many?populate=photos&pagination%5BpageSize%5D=${newsPerPage}&pagination%5Bpage%5D=${page}`);
        const data = await response.json();
        setNews(data.data);
        setTotalPages(data.meta.pagination.pageCount);
    });

    const handleChange = async (event, value) => {
        setPage(value);
        const response = await fetch(`http://localhost:1337/api/mirea-ru-news-many?populate=photos&pagination%5BpageSize%5D=${newsPerPage}&pagination%5Bpage%5D=${value}`);
        const data = await response.json();
        setTotalPages(data.meta.pagination.pageCount);
        setNews(data.data);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Новости
                    </Typography>
                    <ul>
                        {news.map((item) => (
                            <li key={item.id}>
                                <Typography variant="h5" gutterBottom>
                                    {item.attributes.header}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {new Date(item.attributes.dateOfCreation).toLocaleDateString()}
                                </Typography>
                                <MuiMarkdown>{item.attributes.content}</MuiMarkdown>
                                <ImageList cols={5} rowHeight={164}>
                                    {item.attributes.photos.data.map((item) => (
                                        <ImageListItem key={item.id}>
                                            <img
                                                src={`http://localhost:1337${item.attributes.url}`}
                                                srcSet={`http://localhost:1337${item.attributes.url}`}
                                                alt={item.attributes.name}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </li>
                        ))}
                    </ul>
                    <Pagination count={totalPages} page={page} onChange={handleChange} color="primary"/>
                </main>
            </Container>
            <Footer />
        </ThemeProvider>
    );
}

export default News;