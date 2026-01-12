import { Injectable } from "@nestjs/common";
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  Observable,
} from "rxjs";
import axios, { AxiosResponse } from "axios";
import { GitHubPayload, GitHubRepo, GitLabRepo, Hub } from './interfaces/git';

@Injectable()
export class RxjsService {
  private readonly githubURL = "https://api.github.com/search/repositories?q=";
  private readonly gitlabURL = "https://gitlab.com/api/v4/projects?search="

  private getGithub(text: string, count: number): Observable<GitHubRepo> {
    return from(axios.get(`${this.githubURL}${text}`))
      .pipe(
        map((res: AxiosResponse<GitHubPayload>) => res.data.items),
        mergeAll(),
      )
      .pipe(take(count));
  }

  private getGitlab(text: string, count: number): Observable<GitLabRepo> {
    return from(axios.get(`${this.gitlabURL}${text}`))
      .pipe(
        map((res: AxiosResponse<GitLabRepo[]>) => res.data),
        mergeAll(),
      )
      .pipe(take(count));
  }

  async searchRepositories(text: string, hub: Hub = 'github'): Promise<any> {
    const data$: Observable<any> = hub === 'github' ?
      this.getGithub(text, 1).pipe(toArray()) :
      this.getGitlab(text, 1).pipe(toArray());

    data$.subscribe(() => {});

    return await firstValueFrom(data$);
  }
}
