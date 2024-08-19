import { LightningElement } from 'lwc';

export default class ProjectsComponent extends LightningElement {
    projects = [
        {
            title: 'Project 1',
            description: 'Description of Project 1',
            image: 'https://via.placeholder.com/150',
            link: 'https://example.com/project1'
        },
        {
            title: 'Project 2',
            description: 'Description of Project 2',
            image: 'https://via.placeholder.com/150',
            link: 'https://example.com/project2'
        }
    ];
}