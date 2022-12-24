import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';


const mainFeaturedPost = {
    title: 'Сборник новостей и документов из разных источников',
    description:
        "",
    image: 'https://lh3.googleusercontent.com/p/AF1QipOqMnJKvd-C2opEzCVWr-T6NVSjXX0RXq5z0UL-=s680-w680-h510',
    imageText: 'RTU MIREA News',
    linkText: 'Подробнее',
};

const sidebar = {
    title: 'Описание',
    description:
        'Агрегатор новостей РТУ МИРЭА. Здесь Вы можете найти новости и документы с mirea.ru, посты из пабликов ВК, закупки и контракты РТУ МИРЭА.',
    social: [
        { name: 'GitHub', icon: GitHubIcon },
    ],
};

const theme = createTheme();

export default function Aggregator() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={5} sx={{ mt: 3 }}>
                        <Main />
                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            archives={sidebar.archives}
                            social={sidebar.social}
                        />
                    </Grid>
                </main>
            </Container>
            <Footer />
        </ThemeProvider>
    );
}