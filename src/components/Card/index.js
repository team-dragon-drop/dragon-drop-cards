import BaseCard from './BaseCard'
import CardHOC from './CardHOC'
import SubCardHOC from './SubCardHOC'

export const Card = CardHOC(BaseCard)
export const SubCard = SubCardHOC(BaseCard)
