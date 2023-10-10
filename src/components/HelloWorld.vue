<template>
    <div>
        <div class="add-card-form">
            <input class="input" v-model="newProduct.title" placeholder="Заголовок" />
            <textarea class="input" v-model="newProduct.description" placeholder="Описание"></textarea>
            <input class="input" v-model="newProduct.image" placeholder="URL изображения" />
            <button class="btn" @click="addCard">Добавить карточку</button>
        </div>
    
    <div class="sort-controls">
        <label for="sortBy">Сортировка по рейтингу:</label>
            <select class="sort" v-model="sortBy" @change="sortCards">
                <option value="default">По умолчанию</option>
                <option value="rating">По рейтингу</option>
            </select>
    </div>
    
    <h1>Kanban Система</h1>
    
    <div v-if="editingCard">
        <h2>Редактирование карточки</h2>
        <div class="edit-form">
            <input class="input" v-model="editingCard.title" placeholder="Новый заголовок" />
            <textarea class="input" v-model="editingCard.description" placeholder="Новое описание"></textarea>
            <input class="input" v-model="editingCard.image" placeholder="Новый URL изображения" />
        </div>
        <div class="edit-btn">
            <button class="btn" @click="saveEdit">Сохранить</button>
            <button class="btn" @click="cancelEdit">Отмена</button>
        </div>
    </div>
    
    <div class="columns">
        <div
            class="column"
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            @dragover.prevent
            @drop="drop(columnIndex)"
        >
    <h2>{{ column.name }}</h2>
    
    <div
        class="card"
        v-for="(product, productIndex) in column.products"
        :key="product.id"
        :draggable="true"
        @dragstart="startDrag($event, productIndex, columnIndex)"
    >
        <img :src="product.image" alt="Product Image" />
        <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">{{ product.description }}</p>
    </div>
    <div class="card-actions">
        <button class="btn" @click="removeCard(product.id)">Удалить</button>
        <button class="btn" @click="editCard(product)">Редактировать</button>
    </div>
    </div>
   </div>
  </div>
</div>
    
</template>
    
<script>
export default {
    data() {
        return {
    columns: [
        { name: "To Do", color: "lightblue", products: [] },
        { name: "In Progress", color: "lightgreen", products: [] },
        { name: "Done", color: "lightcoral", products: [] }
    ],
        newProduct: { title: "", description: "", image: "" },
        editingCard: null,
        sortBy: "default",
        draggedProduct: null
    };
  },
    methods: {
    addCard() {
        this.columns[0].products.push({
        id: Date.now(),
        ...this.newProduct,
        rating: 0
        });
            this.newProduct = { title: "", description: "", image: "" };
    },
    removeCard(id) {
        for (const column of this.columns) {
            const index = column.products.findIndex(product => product.id === id);
        if (index !== -1) {
            column.products.splice(index, 1);
        break;
    }
  }
},
    editCard(card) {
        this.editingCard = { ...card };
    },
    saveEdit() {
        if (this.editingCard) {
        for (const column of this.columns) {
            const index = column.products.findIndex(product => product.id === this.editingCard.id);
        if (index !== -1) {
            column.products[index] = { ...this.editingCard };
            this.editingCard = null;
        break;
        }
      }
    }
},
    cancelEdit() {
        this.editingCard = null;
    },
    sortCardsByRating() {
        for (const column of this.columns) {
            const sortedProducts = [...column.products];
            sortedProducts.sort((a, b) => b.rating - a.rating);
            column.products = sortedProducts;
    }   
},
    sortCards() {
        if (this.sortBy === "rating") {
        this.sortCardsByRating();
    }
},
    startDrag(event, productIndex, columnIndex) {
        this.draggedProduct = { productIndex, columnIndex };
    },
    drop(targetColumnIndex) {
        if (this.draggedProduct) {
            const { productIndex, columnIndex } = this.draggedProduct;
            const product = this.columns[columnIndex].products.splice(productIndex, 1)[0];
            this.columns[targetColumnIndex].products.push(product);
            this.draggedProduct = null;
        }
    }
  }
};
</script>
    
    
    
<style scoped>
.add-card-form{
    display: flex;
    justify-content: center;
    gap: 1rem;
}
.input{
    width: 20%;
    border-radius: 5px;
    padding: 5px;
}
.btn{
    border-radius: 5px;
    background-color: #bcb6b6;
    border: none;
    padding: 10px;
}
.btn:hover{
    cursor: pointer;
    background-color: #928d8d;
}
.edit-form{
    display: flex;
    justify-content: center;
    gap: 1rem;
}
.edit-btn{
    margin: 10px;
    display: flex;
    justify-content: center;
    gap: 1rem;
}
.sort{
    border-radius: 5px;
}
.columns {
    display: flex;
    gap: 20px;
}

.column {
    flex: 1;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
}

.card {
    border: 1px solid #ccc;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 10px;
    cursor: pointer;
}

.card img {
    max-width: 100%;
}

.card-actions button {
    margin-right: 5px;
}

.sort-controls {
    margin-top: 20px;
}

.card.dragging {
    border: 2px dashed #ccc;
}
</style>