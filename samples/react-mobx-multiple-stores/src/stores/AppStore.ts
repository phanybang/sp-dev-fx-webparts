import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./RootStore";

export enum ApplicationStatus {
    Loading = "Loading",
    CreateList = "Create List",
    CreateItems = "Create Items",
    Completed = "Completed"
}

export interface IFakeItem {
    title: string;
    important: boolean;
}

export class AppStore {

    @observable public isLoadingConfiguration: boolean;
    @observable public isLoadingOtherStuff: boolean;
    @observable public status: ApplicationStatus;
    @observable public listTitle: string;
    @observable public items: IFakeItem[];

    constructor(private rootStore: RootStore) {
        this.setInitialState();
    }

    @action
    private setInitialState(): void {
        this.status = ApplicationStatus.CreateList;
        this.listTitle = null;
        this.items = [];
        this.isLoadingConfiguration = true;
        this.isLoadingOtherStuff = false;
    }

    @computed
    public get appStatus(): string {
        return `The current status is: ${this.status}`;
    }

    @computed
    public get importantItems(): IFakeItem[] {
        return this.items.filter(x => x.important);
    }

    @computed
    public get isLoading(): boolean {
        return this.isLoadingConfiguration || this.isLoadingOtherStuff;
    }

    @action
    public async createList(listTitle: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // Mock creating list
            setTimeout(() => {
                runInAction(() => {
                    this.status = ApplicationStatus.CreateItems;
                    this.listTitle = listTitle;
                    resolve();
                });

            }, 1000);
        });
    }

    @action
    public addListItem(item: IFakeItem): void {
        this.items.push(item);
    }

    @action
    public confirmItems(): void {
        this.status = ApplicationStatus.Completed;
    }
}