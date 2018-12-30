import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { TOKEN, USER_ID, BUYERCART, TRAVELERCART, PROFILEPIC } from './actionTypes';

//const apiHost = 'http://peer-ashique19.c9users.io/api/v1';
const apiHost = 'https://peerposted.com/api/v1';

export default {


    // get payment information
    async getPayout() {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/payout?token=${token}`)
                        .then(res => res)
                        .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async forgetPassword(data) {
        const token = await AsyncStorage.getItem(TOKEN);
        const newData = { ...data, token };
        try {
            const response = await axios.post(`${apiHost}/forgot-password`, newData)
                .then(res => res)
                .catch(err => err);
            return response;
        } catch (error) {
            return error;
        }
    },

    async getALlMessage() {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/messages/inbox?token=${token}`)
                        .then(res => res)
                        .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async updateMessage(data) {
        const token = await AsyncStorage.getItem(TOKEN);
        const newData = { ...data, token };
        try {
            const response = await axios.post(`${apiHost}/messages/inbox/store`, newData)
                .then(res => res)
                .catch(err => err);
            return response;
        } catch (error) {
            return error;
        }
    },

    async postUpdateProfile(data) {
        const token = await AsyncStorage.getItem(TOKEN);
        const newData = { ...data, token };
        try {
            const response = await axios.post(`${apiHost}/save-profile`, newData)
                .then(res => res)
                .catch(err => err);
            return response;
        } catch (error) {
            return error;
        }
    },

    async postWithdraw(data) {
        const token = await AsyncStorage.getItem(TOKEN);
        const newData = { ...data, token };
        try {
            const response = await axios.post(`${apiHost}/withdraw`, newData)
                    .then(res => res)
                    .catch(err => err);
            return response;
        } catch (error) {
            return error;
        }
    },

    // get myProfile
    async getMyProfile() {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/profile?token=${token}`)
                        .then(res => res)
                        .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async addNewTravle(data) {
        const token = await AsyncStorage.getItem(TOKEN);
        const newData = { ...data, token };
        try {
            const response = await axios.post(`${apiHost}/travel`, newData)
                    .then(res => res)
                    .catch(err => err);
            return response;
        } catch (error) {
            return error;
        }
    },

    async travelerCheckOut(data) {
        const token = await AsyncStorage.getItem(TOKEN);
        const newData = { ...data, token };
        try {
            const response = await axios.post(`${apiHost}/traveller-product-confirm-api`, newData)
                    .then(res => res)
                    .catch(err => err);
            return response;
        } catch (error) {
            return error;
        }
    },

    // post Buyer cart checkout method
    async postCheckOutBuyerCart(data) {
        const token = await AsyncStorage.getItem(TOKEN);
        const newData = { ...data, token };
        try {
            const response = await axios.post(`${apiHost}/buyer/store-api`, newData)
                    .then(res => res)
                    .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    // get all active travels
    async fetchALlTravels() {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/my-travels?token=${token}`)
                        .then(res => res)
                        .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    // get all my orders
    async fetchMyOrder() {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/my-orders?token=${token}`)
                        .then(res => res)
                        .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    
    // fetch all products
    async fethchInitialProduct(text = undefined, page = 1) {
        try {
            const response = await axios(`${apiHost}/products/search?q=${text}&page=${page}`);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    // fetch Single Product
    async fetchProductDetails(productId) {
        try {
            const response = await axios(`${apiHost}/product/${productId}/details/api`);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    // add to cart product
    async addToCart(product, price) {
        const token = await AsyncStorage.getItem(TOKEN);
        const { Title, PrimaryCategoryName, PictureURL, ViewItemURLForNaturalSearch } = product;
        try {
            const response = await axios.post(`${apiHost}/cart`, {
                        token,
                        price,
                        title: Title,
                        url: ViewItemURLForNaturalSearch,
                        image: PictureURL[0],
                        quantity: 1,
                        category: PrimaryCategoryName
                    })
                    .then(res => res)
                    .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    // add to cart product
    async addToCartUrl(url, customLinkNote) {
        const token = await AsyncStorage.getItem(TOKEN);
        try {
            const response = await axios.post(`${apiHost}/cart`, {
                        token,
                        url,
                        custom_link_note: customLinkNote
                    })
                    .then(res => res)
                    .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    // Remove Buyer cart
    async removeBuyerCart(id) { 
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/cart/${id}/delete?token=${token}`)
                    .then(res => res)
                    .catch(err => err);
              return response.data;
        } catch (error) {
            return error;
        }
    },

    // fetch all cart for buyer
    async fetchAllCart() {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/cart?token=${token}`)
                        .then(res => res)
                        .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async setCartCounter(count) {
        try {
           await AsyncStorage.setItem(BUYERCART, count.toString());
           return false;
        } catch (error) {
            return error;
        }
    },

    async setProfilePic(profile) {
        try {
           await AsyncStorage.setItem(PROFILEPIC, profile);
           return false;
        } catch (error) {
            return error;
        }
    },

    async getProfilePic() {
        try {
            const count = await AsyncStorage.getItem(PROFILEPIC);
            return count;
        } catch (error) {
            return error;
        }  
    },
    async getUserId() {
        try {
            const id = await AsyncStorage.getItem(USER_ID);
            return id;
        } catch (error) {
            return error;
        }  
    },

    async getCartCounter() {
        try {
            const count = await AsyncStorage.getItem(BUYERCART);
            return count;
        } catch (error) {
            return error;
        }  
    },

    async fetchAllTravelerCart() {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/traveller-cart?token=${token}`)
                        .then(res => res)
                        .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async addToTravelerCart(id) {
        const token = await AsyncStorage.getItem(TOKEN);
        try {
            const response = await axios.post(`${apiHost}/traveller-cart`, { token, id })
                    .then(res => res)
                    .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    // Remove Buyer cart
    async removeTravelerCart(id) { 
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await 
                    axios.get(`${apiHost}/traveller-cart/${id}/remove?token=${token}`)
                    .then(res => res)
                    .catch(err => err);
              return response.data;
        } catch (error) {
            return error;
        }
    },

    async cancelTravelerOrder(id) {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = 
                    await axios.get(`${apiHost}/my-orders/${id}/remove-traveler?token=${token}`)
                    .then(res => res)
                    .catch(err => err);
              return response.data;
        } catch (error) {
            return error;
        }
    },

    async setTravelerCartCounter(count) {
        try {
           await AsyncStorage.setItem(TRAVELERCART, count.toString());
           return false;
        } catch (error) {
            return error;
        }
    },

    async getTravelerCartCounter() {
        try {
            const count = AsyncStorage.getItem(TRAVELERCART);
            return count;
        } catch (error) {
            return error;
        } 
    },

    async fetchBuyRequest() {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/search-buy-requests?token=${token}`)
                    .then(res => res)
                    .catch(err => err);
              return response.data;
        } catch (error) {
            return error;
        }
    },

    async singup(email, password, name, contact, countryId) {
        try {
            const response = await axios.post(`${apiHost}/signup`,
               { email, password, name, contact, country_id: countryId })
                .then(res => res)
                .catch(err => err);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    // This is sign up page
    async login(email, password) {
        try {
            const response = await axios.post(`${apiHost}/login`, 
                                { email, password })
                                .then(res => res)
                                .catch(error => error);
            return response.data;  
        } catch (error) {
            return error;
        }
    },

    // This is loading all country
    async fetchAllCountry() {
        try {
            const token = await AsyncStorage.getItem(TOKEN);
            const response = await axios.get(`${apiHost}/country?token=${token}`)
                    .then(res => res)
                    .catch(err => err);
              return response.data;
        } catch (error) {
            return error;
        }
    },
    async fetchPublicCountry() {
        try {
            const response = await axios.get(`${apiHost}/country-list`)
                    .then(res => res)
                    .catch(err => err);
              return response;
        } catch (error) {
            return error;
        }
    },
    // check local storage user is exits or not
    async checkUserInfo() {
        try {
            const value = await AsyncStorage.getItem(TOKEN);
            return !!value;       
        } catch (error) {
            // Error retrieving data
            return error;
        }
    },

    // logout function
    async logout() {
        try {
            await AsyncStorage.removeItem(TOKEN);
            await AsyncStorage.removeItem(PROFILEPIC);
            await AsyncStorage.removeItem(USER_ID);
        } catch (error) {
            console.log('error');
        }
    },

    // set User Data to local storate
    async setUserData(data) {
        console.log(data.id);
        try {
            await AsyncStorage.setItem(USER_ID, data.id.toString());
            await AsyncStorage.setItem(TOKEN, data.token);
            return true;
          } catch (error) {
            return false;
          }
    }
};

