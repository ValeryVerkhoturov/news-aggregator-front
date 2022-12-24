import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Paper from "@mui/material/Paper";


const theme = createTheme();



function Purchases() {

    const [purchases, setPurchases] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const rowsPerPage = 25;

    useState(async () => {
        const response = await fetch(`http://localhost:1337/api/zakupki-gov-ru-purchases?pagination%5Bpage%5D=${page}`);
        const data = await response.json();
        setTotalPages(data.meta.pagination.total);
        setPurchases(data.data);
    });

    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        const response = await fetch(`http://localhost:1337/api/zakupki-gov-ru-purchases?pagination%5Bpage%5D=${newPage}`);
        const data = await response.json();
        setTotalPages(data.meta.pagination.total);
        setPurchases(data.data);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Закупки
                    </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Регистрационный номер</TableCell>
                                        <TableCell align="left">Объект закупки</TableCell>
                                        <TableCell align="left">Статус закупки</TableCell>
                                        <TableCell align="left">Дата публикации</TableCell>
                                        <TableCell align="left">Дедлайн</TableCell>
                                        <TableCell align="left">Дата изменения</TableCell>
                                        <TableCell align="right">Начальная цена (руб.)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {purchases.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">{row.attributes.regNumber}</TableCell>
                                            <TableCell align="left">{row.attributes.purchaseObject}</TableCell>
                                            <TableCell align="left">{row.attributes.status}</TableCell>
                                            <TableCell align="left">{row.attributes.postDate}</TableCell>
                                            <TableCell align="left">{row.attributes.deadlineDate}</TableCell>
                                            <TableCell align="left">{row.attributes.updateDate}</TableCell>
                                            <TableCell align="right">{row.attributes.startPrice}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {(totalPages !== undefined) ?
                                <TablePagination
                                    rowsPerPageOptions={[rowsPerPage]}
                                    rowsPerPage={rowsPerPage}
                                    count={totalPages}
                                    component="div"
                                    page={page}
                                    onPageChange={handleChangePage}/> : null}
                        </TableContainer>
                </main>
            </Container>
            <Footer />
        </ThemeProvider>
    );
}

export default Purchases;