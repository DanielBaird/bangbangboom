import React from 'react'

import './HexStacks.scss'


export default function HexStacks({statuses}) {

	const stacksUi = statuses.map((s)=> <Stack key={s.type} {...s} /> )

	return (
		<div className="hexstacks">
			{stacksUi}
		</div>
	)
}
// --------------------------------------------------------
function Stack(props) {
	return (
		<div className="stack">
			<StackGraph count={props.remaining} />
			<StackTitle title={props.type} />
		</div>
	)
}
// --------------------------------------------------------
function StackTitle({title}) {
	return <div className="stacktitle">{title}</div>
}
// --------------------------------------------------------
// function StackInfo({type, remaining, fallback}) {
// 	return <div className="stackinfo">
// 		<div className="stacktype">{type}</div>
// 		<div className="stackcount">{remaining}</div>
// 	</div>
// }
// --------------------------------------------------------
function StackGraph({count}) {
	const layers = Array(count).fill('').map((l, i) => {
		return <div className="stacklayer" key={i}></div>
	})
	return <>
		<div className="stackgraph">
			{layers}
			<div className="stackcount">{count}</div>
		</div>
	</>
}
