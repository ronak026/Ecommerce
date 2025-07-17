const API_URL = "http://localhost:8080/product"

export async function fetchProducts() {
    const response = await fetch(`${API_URL}/product`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        token: JSON.parse(localStorage.getItem('user')).token
        }
    });
    
    const data = await response.json();
    return data;

}

export async function addProducts(product) {
    const response = await fetch(`${API_URL}/add-product`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        token: JSON.parse(localStorage.getItem('user')).token
        },
        body: JSON.stringify(product)
    });
    
    const data = await response.json();
    return data;

}

export async function getSingleProduct(id) {
    const response = await fetch(`${API_URL}/product/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        token: JSON.parse(localStorage.getItem('user')).token
        }
    });
    
    const data = await response.json();
    return data.product;
}

export async function updateProduct(id, product) {
    const response = await fetch(`${API_URL}/update-product/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        token: JSON.parse(localStorage.getItem('user')).token
        },
        body: JSON.stringify(product)
    });
    
    const data = await response.json();
    return data;
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/delete-product/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        token: JSON.parse(localStorage.getItem('user')).token
        }
    });
    
    const data = await response.json();
    return data;
}

