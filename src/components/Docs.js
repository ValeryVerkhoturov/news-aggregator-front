import {createTheme} from "@mui/material/styles";
import {useState} from "react";
import {Box, Button, Pagination, ThemeProvider, Typography} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Header from "./Header";
import Footer from "./Footer";


const theme = createTheme();

function Docs() {

    const [docs, setDocs] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const docsPerPage = 2;

    useState(async () => {
        const response = await fetch(`http://localhost:1337/api/mirea-ru-docs-many?populate=document%2C%20documentSignature&pagination%5BpageSize%5D=${docsPerPage}&pagination%5Bpage%5D=${page}`);
        const data = await response.json();
        setDocs(data.data);
        setTotalPages(data.meta.pagination.pageCount);
    });

    const onDocDownload = (doc) => {
        const link = document.createElement("a");
        link.download = `http://localhost:1337${doc.data.attributes.name}`;
        link.href = `http://localhost:1337${doc.data.attributes.url}`;
        link.click();
    };

    const handleChange = async (event, value) => {
        setPage(value);
        const response = await fetch(`http://localhost:1337/api/mirea-ru-docs-many?populate=document%2C%20documentSignature&pagination%5BpageSize%5D=${docsPerPage}&pagination%5Bpage%5D=${value}`);
        const data = await response.json();
        setTotalPages(data.meta.pagination.pageCount);
        setDocs(data.data);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Документы
                    </Typography>
                    <ul>
                        {docs.map((item) => (
                            <Box key={item.id} sx={{ paddingY:2 }}>
                                <Typography variant="h6" gutterBottom>
                                    {item.attributes.name}
                                </Typography>
                                <Typography variant="h7" display="inline">
                                    {item.attributes.index ? `#${item.attributes.index}. ` : null}
                                    {" "}
                                    {new Date(item.attributes.dateOfCreation).toLocaleDateString()}
                                    <br/>
                                    {item.attributes.filter}
                                </Typography>

                                <Button onClick={() => onDocDownload(item.attributes.document)} variant="contained">
                                    Документ
                                </Button>
                                {item.attributes.documentSignature.data ? (() => {
                                    return (
                                        <Button sx={{ mx: 1 }} onClick={() => onDocDownload(item.attributes.documentSignature)} variant="contained">
                                            Подпись
                                        </Button>
                                    )})() : null}
                            </Box>
                        ))}
                    </ul>
                    <Pagination count={totalPages} page={page} onChange={handleChange} color="primary"/>
                </main>
            </Container>
            <Footer />
        </ThemeProvider>
    );
}

export default Docs;