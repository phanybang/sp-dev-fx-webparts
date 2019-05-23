import { inject, observer } from "mobx-react";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { AppStore } from '../../../stores/AppStore';
import { Stores } from "../../../stores/RootStore";

export type ListCreatorStoreProps = {
    appStore: AppStore;
};

export type ListCreatorProps = Partial<ListCreatorStoreProps>;
export type ListCreatorState = {
    loading: boolean;
    errorMessage: string;
    listTitle: string;
};

@inject(Stores.AppStore)
@observer
export class ListCreator extends React.Component<ListCreatorProps, ListCreatorState> {
    public state = {
        loading: false,
        errorMessage: undefined,
        listTitle: null
    };

    public render(): React.ReactElement<ListCreatorProps> {
        const spinner = (<Spinner size={SpinnerSize.xSmall} label="Creating list ..." labelPosition="right" />);

        return (
            <div>
                <TextField
                    label="List title"
                    errorMessage={this.state.errorMessage}
                    onChange={this._onChangeListTitle}
                    value={this.state.listTitle}
                />

                <PrimaryButton
                    onClick={() => this.createList()}
                    disabled={this.state.loading}
                >
                    {this.state.loading ? spinner : "Create List"}
                </PrimaryButton>
            </div>
        );
    }

    public async createList() {
        if (this.state.listTitle && this.state.listTitle.length > 0) {
            this.setState({ ...this.state, loading: true, errorMessage: undefined });
            await this.props.appStore.createList("MOCK TITLE");
            this.setState({ ...this.state, loading: false });
        }
        else {
            this.setState({ ...this.state, errorMessage: "Required" });
        }

    }

    private _onChangeListTitle = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
        if (newValue === "" && newValue.length === 0) {
            this.setState({ ...this.state, listTitle: newValue, errorMessage: "Required" });
        }
        else {
            this.setState({ ...this.state, listTitle: newValue });

        }
    };
}
