import React from 'react'
import ProfileView from './ProfileView'
import { BASE_URL } from "../../app.constants";
import './profile.scss';
import Axios from "axios";
class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            followers: [],
            partners: [],
            userPublications: [],
            lastScrollPos: 0,
            loading: false,
            page: 1,
            noMoreData: false
        }
    }

    componentDidMount() {
        // if (!localStorage.getItem('AUTH_TOKEN') || localStorage.getItem('AUTH_TOKEN') === "") {
        //     this.props.history.replace("/login");
        //     return;
        // }

        Axios.defaults.headers.common["Authorization"] = localStorage.getItem('AUTH_TOKEN');

        Axios.get(BASE_URL + "/api/user").then((response) => {
            this.setState({ user: response.data });
        }).catch((error) => {
            console.log(error);
        })

        Axios.get(BASE_URL + "/api/partners").then((response) => {
            this.setState({ partners: response.data });
        }).catch((error) => {
            console.log(error);
        })

        Axios.get(BASE_URL + "/api/followers").then((response) => {
            this.setState({ followers: response.data });
        }).catch((error) => {
            console.log(error);
        })

        Axios.get(BASE_URL + "/api/userpublications").then((response) => {
            this.setState({ userPublications: response.data });
        }).catch((error) => {
            console.log(error);
        })

        document.addEventListener('scroll', this.trackScrolling);
    }

    loadMoreData() {

        if (this.state.noMoreData) {
            return;
        }

        Axios.get(BASE_URL + "/api/userpublications", {
            params: {
                page: this.state.page + 1
            }
        })
            .then((response) => {
                if (response && response.data) {
                    this.setState(prevState => ({
                        userPublications: prevState.userPublications.concat(response.data),
                        loading: false,
                        page: this.state.page + 1
                    }));
                } else {
                    this.setState({ noMoreData: true });
                }
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                this.setState({ loading: false });
            })
    }

    trackScrolling = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;

        if (!this.state.noMoreData && !this.state.loading && this.state.lastScrollPos < scrolled && Math.ceil(scrolled) >= scrollable - 100) {
            this.setState({ loading: true });
            this.loadMoreData();
        }

        this.setState({ lastScrollPos: scrolled });
    }

    render() {
        return(
            <ProfileView stateFields={this.state}/>
        )
    }
}
export default ProfileContainer 