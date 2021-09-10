type Organizer = {
    id: number,
    name: string,
    creationDate: Date,
    following: boolean,
    picture: string,
    followers: number,
    [propName: string]: any,
}

export default Organizer;