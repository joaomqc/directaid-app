export default interface IEvent {
    id: number,
    name: string,
    creationDate: Date,
    following: boolean,
    picture: string,
    followers: number,
    [propName: string]: any,
}