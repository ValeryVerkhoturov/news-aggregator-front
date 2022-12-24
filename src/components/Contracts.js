import { useState, Fragment } from "react";
import {
    Collapse,
    IconButton,
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
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const theme = createTheme();


function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="right">{row.attributes.regNumber}</TableCell>
                <TableCell align="left">{row.attributes.status}</TableCell>
                <TableCell align="left">{row.attributes.signDate}</TableCell>
                <TableCell align="left">{row.attributes.executionDate}</TableCell>
                <TableCell align="left">{row.attributes.distributionDate}</TableCell>
                <TableCell align="left">{row.attributes.updateDate}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h9" gutterBottom component="div">
                                Объекты закупки
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Наименование</TableCell>
                                        <TableCell>Позиция КТРУ</TableCell>
                                        <TableCell>Позиция ОКПД2</TableCell>
                                        <TableCell>Тип</TableCell>
                                        <TableCell>Количество</TableCell>
                                        <TableCell align="right">Цена за единицу</TableCell>
                                        <TableCell align="right">Цена</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.attributes.purchaseObject.map((purchaseObject) => (
                                        <TableRow key={purchaseObject.id}>
                                            <TableCell component="th" scope="row">
                                                {purchaseObject.name}
                                            </TableCell>
                                            <TableCell>{purchaseObject.positionKtru}</TableCell>
                                            <TableCell>{purchaseObject.positionOkpd2}</TableCell>
                                            <TableCell>{purchaseObject.type}</TableCell>
                                            <TableCell>{purchaseObject.ammount}</TableCell>
                                            <TableCell align="right">{purchaseObject.unitPrice}</TableCell>
                                            <TableCell align="right">{purchaseObject.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        attributes: PropTypes.shape({
            regNumber: PropTypes.string.isRequired,
            signDate: PropTypes.string.isRequired,
            executionDate: PropTypes.string.isRequired,
            distributionDate: PropTypes.string.isRequired,
            updateDate: PropTypes.string.isRequired,
            purchaseObject: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string,
                    positionKtru: PropTypes.string,
                    positionOkpd2: PropTypes.string,
                    type: PropTypes.string,
                    ammount: PropTypes.string,
                    unitPrice: PropTypes.number,
                    price: PropTypes.number,
                }),
            ),
        }).isRequired,
    }).isRequired,
};

function Contracts() {

    const [contracts, setContracts] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const rowsPerPage = 25;

    useState(async () => {
        const response = await fetch(`http://localhost:1337/api/zakupki-gov-ru-contracts?populate=%2A&pagination%5Bpage%5D=${page}`);
        const data = await response.json();
        setTotalPages(data.meta.pagination.total);
        setContracts(data.data);
    });

    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        const response = await fetch(`http://localhost:1337/api/zakupki-gov-ru-contracts?populate=%2A&pagination%5Bpage%5D=${newPage}`);
        const data = await response.json();
        setTotalPages(data.meta.pagination.total);
        setContracts(data.data);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Контракты
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="right">Регистрационный номер</TableCell>
                                    <TableCell align="left">Статус</TableCell>
                                    <TableCell align="left">Дата подписания</TableCell>
                                    <TableCell align="left">Дата исполнения</TableCell>
                                    <TableCell align="left">Дата публикации</TableCell>
                                    <TableCell align="left">Дата изменения</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contracts.map((row) => (<Row row={row} key={row.id}></Row>))}
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

export default Contracts;