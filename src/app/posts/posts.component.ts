import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

const POST_LIST = gql`
    query getPosts {
        posts {
            id
            title
        }
    }
`;

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    data: Observable<any>;

    constructor(
        private apollo: Apollo,
    ) { }

    ngOnInit() {
        this.data = this.apollo
            .watchQuery<any>({query: POST_LIST})
            .valueChanges
            .pipe(
                map(({data}) => data.posts),
            );
    }

}
