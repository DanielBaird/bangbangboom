
import { useReducer } from 'react'

export default function useForceRender() {
	// eslint-disable-next-line
	const [_, forceRender] = useReducer((x)=>x+1,0) // sadly this is required
	return forceRender
}