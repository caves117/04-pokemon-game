<template>
  <h1 v-if="!pokemon"> Wait</h1>
  <div v-else>
    <h1>¿Quién es este pokemón?</h1>
    <PokemonPicture 
    :pokemonId="pokemon.id" 
    :showPokemon="showPokemon"/>
    <PokemonOptions 
    :pokemons="pokemonArr" 
    @selection="checkAnswer"/>
    <template v-if="showAnswer" class="fade-in">
      <h2>{{message}}</h2>
      <button @click="newGame">Nuevo juego</button>
    </template>
  </div>

</template>

<script>

import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

import {getPokemonOptions} from '@/helpers/getPokemonOptions'

export default {
    components: {
      PokemonPicture,
      PokemonOptions
    },
    data() {
      return {
        pokemonArr: [],
        pokemon: null,
        showPokemon: false,
        showAnswer: false,
        message: ''
      }
    },
    methods: {
      async mixPokemonArr() {
        this.pokemonArr = await getPokemonOptions()
        const rndInt = Math.floor(Math.random() * 4)
        this.pokemon = this.pokemonArr[rndInt]
      },
      checkAnswer(pokemonId){
        console.log('llamando', pokemonId, this.pokemon.id)
        this.showPokemon = true
        this.showAnswer = true
        if (pokemonId === this.pokemon.id){
          this.message = `Correcto! es ${ this.pokemon.name}`
        } else {
          this.message = `Ops! era ${ this.pokemon.name}`
        }
      },
      newGame(){
        this.showPokemon = false
        this.showAnswer = false
        this.pokemonArr = []
        this.pokemon = null
        this.mixPokemonArr()
      }
    },
    mounted() {
      this.mixPokemonArr()
    }
}
</script>

<style>

</style>