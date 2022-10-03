export class Project {
  label: string;
  key: string;
  url: string;

  constructor(project: Project) {
    this.label = project.label;
    this.key = project.key;
    this.url = project.url;
  }
}
