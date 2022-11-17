import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmoloyersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                { name: 'Victoria B.', salary: 800, increase: false, rise: true, id: 1 },
                { name: 'Stan S.', salary: 3000, increase: false, rise: false, id: 2 },
                { name: 'Andreyus A.', salary: 5000, increase: true, rise: false, id: 3 }
            ],
            term: '',
            filteredData: 'all'
        }
    }

   
    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    onAddEmployees = (name, salary) => {
        const newItem = {
            name, 
            salary, 
            increase: false,
            rise: false,
            id: Date.now()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {        
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));
    }

    searchEmp = (items, term, filter) => {
        if (term.length === 0) {
            return items;
        } 

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        });
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000);
            default: 
                return items;
        }
    }

    onFilterSelect = (filteredData) => {
        this.setState({filteredData});
    } 

   render() {
        const {data, term, filteredData} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filteredData);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filteredData} onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem} 
                    onToggleProp={this.onToggleProp}/>
                <EmoloyersAddForm onAddEmployees={this.onAddEmployees}/>
            </div>
            
        );
   }
}

export default App;