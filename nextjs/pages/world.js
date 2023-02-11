import Link from 'next/link';

const world = () => {
    return (
        <div>
            <h1>여기는 world.js 입니다.</h1>
            <hr />
            <ul>
                <li><Link href="/">홈</Link></li>
                <li><Link href="/hello">Hello</Link></li>
                <li><Link href="/world">World</Link></li>
            </ul>
        </div>
    );
};

export default world;