import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { ReversePipe } from '../reverse.pipe';
import { ApolloQueryResult } from 'apollo-client';

const POST_DETAILS = gql`
    query getPost($id: Int!) {
        post(id: $id) {
            id
            title
            body
            comments {
                id
                email
                body
            }
        }
    }
`;

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {

    post: any;
    loading: Boolean;
    queryRef: QueryRef<any>;

    constructor(
        private apollo: Apollo,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    handleCommentAdded() {
        this.queryRef.refetch();
    }

    handleCommentRemoved() {
        this.queryRef.refetch();
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.queryRef = this.apollo
            .watchQuery<any>({
                query: POST_DETAILS,
                variables: {
                    id,
                }
            });
            
        this.queryRef.valueChanges.subscribe(({ data, loading }) => {
            this.post = data.post;
            this.loading = loading;
        });
    }

}
