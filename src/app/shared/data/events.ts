class Events {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public date: Date,
    public location: string,
    public imageUrl: string,
    public price: number,
    public nbPlaces: number,
    public nbrLike: number
  ) {}
}
