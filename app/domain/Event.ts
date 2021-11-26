type Event = {
    id: number,
    title: string,
    creationDate: string,
    date: string,
    location: string,
    following: boolean,
    picture: string,
    followers: number,
    [propName: string]: any,
    organizer: {
        id: number,
        name: string
    }
}

export default Event;