import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper = null
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('should render 3 <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('should an exact logout', () => {
        wrapper.setProps({isAthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})