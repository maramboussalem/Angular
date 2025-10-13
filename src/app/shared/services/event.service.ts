import { Injectable } from '@angular/core';
import { Eventy } from '../../models/eventy';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  list: Eventy[] = [
    {
      id: 1,
      title: 'Angular Summit',
      description: 'Conférence sur Angular et l’écosystème front-end.',
      date: new Date('2025-11-10'),
      location: 'Tunis',
      price: 50,
      organizerId: 101,
      imageUrl: 'https://m.media-amazon.com/images/I/71vC4ryHjOL._UF1000,1000_QL80_.jpg',
      nbPlaces: 25,
      nbrLike: 0
},
{
  id: 2,
  title: 'Web Dev Days',
  description: 'Journée dédiée aux frameworks web modernes.',
  date: new Date('2025-01-05'),
  location: 'Ariana',
  price: 30,
  organizerId: 102,
  imageUrl: 'https://cdn.dribbble.com/userupload/37287941/file/original-a59d13499667b765fb5aceb8b5d5bf0d.jpg',
  nbPlaces: 0,
  nbrLike: 3
  },
  {
id: 3,
title: 'React Conference',
description: 'Conférence internationale sur React et son écosystème.',
date: new Date('2025-06-20'),
location: 'Sfax',
price: 45,
organizerId: 103,
imageUrl: 'https://www.atmail.com/wp-content/uploads/2018/01/React_logo_wordmark.png',
nbPlaces: 40,
nbrLike: 5
    },
  {
   id: 4,
title: 'Node.js Workshop',
description: 'Atelier pratique sur le développement backend avec Node.js.',
date: new Date('2025-09-15'),
location: 'Monastir',
price: 35,
organizerId: 104,
imageUrl: 'https://nodejs.org/static/images/logo.svg',
nbPlaces: 20,
nbrLike: 2
    },
    {
    id: 5,
title: 'Vue.js Meetup',
description: 'Rencontre conviviale pour les passionnés de Vue.js.',
date: new Date('2025-12-05'),
location: 'Sousse',
price: 25,
organizerId: 105,
imageUrl: 'https://vuejs.org/images/logo.png',
nbPlaces: 30,
nbrLike: 1
    }
    ];
  constructor() { }

  getAllEvents(): Eventy[] {
    return this.list;
  }   
  getEventById(id: number): Eventy | undefined {
    return this.list.find(event => event.id === id);
  }
  searchEvents(query: string): Eventy[] {
    const q = query.trim().toLowerCase();
    return this.list.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );
  }     
  likeEvent(id: number): boolean {
    const event = this.getEventById(id);      
    if (event && event.nbPlaces > 0 && event.date > new Date()) {
      event.nbrLike++;
      return true;
    }   
    return false;
  }
  buyTicket(id: number): boolean {
    const event = this.getEventById(id);
    if (event && event.nbPlaces > 0 && event.date > new Date()) {
      event.nbPlaces--;
      return true;
    }
    return false;
  }
} 