import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const sections = [
    { title: 'Новости', url: '/news' },
    { title: 'Документы', url: '/docs' },
    { title: 'Посты', url: '/posts' },
    { title: 'Закупки', url: '/purchases' },
    { title: 'Контракты', url: '/contracts' },
];

function Header() {

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    Новостной агрегатор РТУ МИРЭА
                </Typography>
                <Link variant="outlined" size="small" href="http://localhost:1337/admin/">
                    Sign in
                </Link>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

export default Header;