import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const REMOVE_COMMENT = gql`
    mutation remove($id: Int!) {
        removeComment(id: $id)
    }
`;

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    @Input() comment:any;

    @Output() onRemoved = new EventEmitter<void>();

    constructor(
        private apollo: Apollo,
    ) { }

    ngOnInit() {
    }

    removeComment() {

        console.log("removing...");

        this.apollo.mutate({
            mutation: REMOVE_COMMENT,
            variables: {
                id: this.comment.id,
            }
        }).subscribe(({ data }) => {
            this.onRemoved.emit();
            console.log('got data', data);
        },(error) => {
            console.log('there was an error sending the query', error);
        });
    }

}
