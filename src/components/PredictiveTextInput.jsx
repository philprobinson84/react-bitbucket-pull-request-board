import React, { Component } from 'react'
import { Box, FormField, Menu, Select } from 'grommet'

export default class PredictiveTextInput extends Component {
    constructor(props) {
        super(props);
        this.selectOption = this.selectOption.bind(this);
        this.deselectOption = this.deselectOption.bind(this);
        this.getEntering = this.getEntering.bind(this);
        this.setSelection = this.setSelection.bind(this);
        this.updateSuggestions = this.updateSuggestions.bind(this);

        this.state = {
            suggestions: []
        }
    }

    selectOption(value) {
        let newSelected = this.props.selected.slice();

        // Check not already selected
        if (this.props.selected.indexOf(value) < 0) {
            newSelected.push(value);
        }

        this.setSelection(newSelected);
    }

    deselectOption(value) {
        let newSelected = this.props.selected.slice();

        // Check selected
        const index = this.props.selected.indexOf(value);
        if (index >= 0) {
            newSelected.splice(index, 1);
        }

        this.setSelection(newSelected);
    }

    setSelection(selection) {
        if (this.props.setSelection !== undefined) {
            this.props.setSelection(selection);
        }
    }

    getEntering(text) {
        const values = this.splitText(text, ',');
        return (values.length) ? values[values.length - 1] : '';
    }

    splitText(text, separator) {
        return text.split(separator).map(value => value.trim());
    }

    checkStartsWith(text, checkMatch, exclude) {
        return (checkMatch.startsWith(text) && (exclude.indexOf(checkMatch) < 0));
    }

    checkWordsStartWith(text, checkMatch, exclude) {
        const checkMatchWord = checkMatch.split('-');

        // Search split text for one that starts with checkMatch
        //  and isn't in exclusions
        for (let i = 0; i < checkMatchWord.length; i++) {
            if (checkMatchWord[i].startsWith(text) && (exclude.indexOf(checkMatch) < 0)) {
                return true;
            }
        }

        return false;
    }

    checkWordIn(text, checkMatch, exclude) {
        return (checkMatch.indexOf(text) >= 0 && exclude.indexOf(checkMatch) < 0);
    }

    getSuggestions(text, exclude) {
        const strippedText = text.replace(/^[\s-]+|\s+$/g, '');

        if (strippedText.length && this.props.options) {
            return this.props.options.filter(option => {
                if (strippedText.indexOf('-') > 0) {
                    return this.checkWordIn(strippedText, option, exclude);
                }
                else {
                    return this.checkWordsStartWith(strippedText, option, exclude);
                }
            })
        }
        else {
            return [];
        }
    }

    updateSuggestions(text, exclude) {
        this.setState({
            suggestions: this.getSuggestions(text, exclude)
        })
    }

    render() {
        let removeSelectedMenu = null;

        if (this.props.selected && this.props.selected.length) {
            removeSelectedMenu = (
                <Menu
                    label='Remove selected'
                    justifyContent='between'
                    items={this.props.selected.map(text => (
                        {
                            label: text,
                            onClick: (() => this.deselectOption(text))
                        })
                    )}
                />
            )
        }

        let options = [];
        if (this.state.suggestions && this.state.suggestions.length) {
            options = this.state.suggestions;
        }
        else if (this.props.options && this.props.options.length) {
            options = this.props.options;
        }

        return (
            <Box>
                <FormField label={this.props.label}>
                    <Select
                        options={options}
                        onChange={option => this.selectOption(option.value)}
                        closeOnChange={false}
                        searchPlaceholder={this.props.placeholder}
                        onSearch={text => this.updateSuggestions(text, this.props.selected)}
                    />
                </FormField>
                {removeSelectedMenu}
            </Box>
        );
    }
}
