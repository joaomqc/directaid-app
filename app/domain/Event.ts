export default interface IEvent {
    id: number,
    title: string,
    creationDate: Date,
    date: Date,
    location: string,
    following: boolean,
    picture: string,
    followers: number,
    [propName: string]: any,
}