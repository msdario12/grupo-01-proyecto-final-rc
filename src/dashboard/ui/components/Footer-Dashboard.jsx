import { Link } from "react-router-dom";

export const FooterDashboard = () => {
    return (
        <>
            <footer className='page-footer font-small blue footer-container'>
                <div className='footer-copyright text-center py-2 links-footer-container'>
                    © 2023 Copyright:
                    <Link
                        to={'/'}
                    >
                        {' '}
                        RollingVet.com
                    </Link>
                </div>
            </footer>
        </>
    );
};
