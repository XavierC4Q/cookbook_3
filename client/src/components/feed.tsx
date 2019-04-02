import * as React from 'react';

export interface IFeedProps {}
 
const Feed: React.FC<IFeedProps> = (props: IFeedProps) => {
    return (<div>
            <h1>User Feed</h1>
        </div>);
}
 
export default Feed;