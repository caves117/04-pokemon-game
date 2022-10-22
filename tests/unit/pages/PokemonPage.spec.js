import {shallowMount, mount} from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import {pokemons} from '../mocks/pokemons.mock'

describe('PokemonPage Component', () => {

    let wrapper
    beforeEach( () => {
        wrapper = shallowMount(PokemonPage)
    })
    
    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de llamar mixPokemonArr al montar', () => {
        const mixPokemonArrSpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArr')
        //se llama a otro wrapper porque se necesita escuchar si se ejecutó el método al montar la aplicación, si se usa el declarado global, para este punto el método ya ha sido llamado
        const wrapper = shallowMount(PokemonPage)
        expect(mixPokemonArrSpy).toHaveBeenCalled()
    })

    test('debe de hacer match con el snapshot cuando se cargan los pokemons', () => {
        //shallowMount - monta de una manera ligera o simulada de los componentes (stub)
        //mount - monto todo los componentes como debe ser
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Debe de mostrar los componentes de Pokemon Picture y PokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')
        //PokemonPicture y PokemonOptions deben de existir
        expect(picture.exists()).toBeTruthy()
        expect(options.exists()).toBeTruthy()
        //PokemonPicture attribute pokemonId === 5
        expect(picture.attributes('pokemonid')).toBe('1')
        //PokemonOptions attribute pokemon toBe true
        expect(options.attributes('pokemons')).toBeTruthy()
    })

    test('pruebas con checkanswer', async() => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        await wrapper.vm.checkAnswer(1)
        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`Correcto! es ${ pokemons[0].name }`)

        await wrapper.vm.checkAnswer(10)
        expect(wrapper.vm.message).toBe(`Ops! era ${ pokemons[0].name}`)
    })

})