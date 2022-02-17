import Link from 'next/link';

const Header = () => {
    return (
        <nav className='navbar navbar-inverse'>
            <div className='container'>
                <div className='navbar-header'>
                    <a className="navbar-brand" href="/">Hello Next</a>
                </div>
                <div id="navbar">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link href="/about/introduce"><a>회사소개</a></Link>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">포트폴리오 <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><Link href="/portfolio/web"><a>Web Site</a></Link></li>
                                <li><Link href="/portfolio/mobile"><a>Mobile Web Site</a></Link></li>
                                <li><Link href="/portfolio/app"><a>iOS/Android App</a></Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
