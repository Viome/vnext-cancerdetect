import ContentLoader from 'react-content-loader';

const LoginContentLoader = (props: any) => (
    <div className="flex grow flex-col items-center justify-center lg:items-start">
        <ContentLoader
            speed={2}
            width={274}
            height={116}
            viewBox="0 0 274 116"
            backgroundColor="#E7E7EA"
            foregroundColor="#ededed"
            {...props}
        >
            <rect x="10" y="0" rx="0" ry="0" width="274" height="43" />
            <rect x="10" y="58" rx="0" ry="0" width="274" height="43" />
        </ContentLoader>
        <ContentLoader
            speed={2}
            width={274}
            height={100}
            viewBox="0 0 274 100"
            backgroundColor="#A1A3AD"
            foregroundColor="#ededed"
            {...props}
        >
            <rect x="10" y="0" rx="0" ry="0" width="274" height="43" />
        </ContentLoader>
        <ContentLoader
            speed={2}
            width={274}
            height={250}
            viewBox="0 0 274 250"
            backgroundColor="#CFD0D5"
            foregroundColor="#ededed"
            {...props}
        >
            <rect x="84.5" y="0" rx="0" ry="0" width="105" height="22" />
            <rect x="43" y="37" rx="0" ry="0" width="188" height="22" />
        </ContentLoader>
        <ContentLoader
            speed={2}
            width={274}
            height={100}
            viewBox="0 0 274 100"
            backgroundColor="#E7E7EA"
            foregroundColor="#ededed"
            {...props}
        >
            <rect x="64.5" y="0" rx="0" ry="0" width="145" height="22" />
        </ContentLoader>
    </div>
);

export default LoginContentLoader;

