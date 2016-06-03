import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../models/hero.model';

@Injectable()
export class HeroService {

    private heroUrl = '/api/v1/heroes';

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        const headers = new Headers();
        return this.http.get(this.heroUrl, { headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    getHero(id: String): Promise<Hero> {
        const headers = new Headers();
        const url = `${this.heroUrl}/${id}`;
        return this.http
            .get(url, { headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    save(hero: Hero): Promise<Hero> {
        if (hero._id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    delete(hero: Hero) {
        const headers = this.createHeaders();
        const url = `${this.heroUrl}/${hero._id}`;
        return this.http
            .delete(url, { headers: headers})
            .toPromise()
            .catch(this.handleError);
    }

    private post(hero: Hero): Promise<Hero> {
        const headers = this.createHeaders();
        return this.http
            .post(this.heroUrl, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private put(hero: Hero): Promise<Hero> {
        const headers = this.createHeaders();
        const url = `${this.heroUrl}/${hero._id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private createHeaders() {
        return new Headers({'Content-Type': 'application/json'});
    }
}
