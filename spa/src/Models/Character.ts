export default class Character {
  id: number;
  name: string;
  image: string;
  copyright: string;
  attributionText: string;
  description: string;
  color: string;

  constructor(
    id: number,
    name: string,
    image: string,
    copyright: string,
    attributionText: string,
    description: string,
    color: string,
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.copyright = copyright;
    this.attributionText = attributionText;
    this.description = description;
    this.color = color;
  }

  static fromJson(data: any, copyright: string, attributionText: string, color: string): Character {
    const id = data.id;
    const name = data.name;
    const image = data.thumbnail.path + '.' + data.thumbnail.extension;
    const description = '\t\t\t\t\t\t' + data.description;

    return new Character(
      id,
      name,
      image,
      copyright,
      attributionText,
      description,
      color,
    );
  }
}
