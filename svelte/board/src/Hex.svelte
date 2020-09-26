<script>

</script>

<style>
.hex {
    box-sizing: border-box;
	text-align: center;
	margin: 0 calc( (1/2 * var(--side)));
	position: relative;
	height: calc(var(--side) * 2 * var(--sqrt3) / 2);
	width: calc(1 * var(--side));
	padding: var(--gutter);
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	display: inline-flex;
	float: left;
	margin: 0 0 0 calc(1/2 * var(--side));
	shape-outside: polygon(
		calc(1/2 * var(--side))    0,
		calc(3/2 * var(--side))    0,
		calc(4/2 * var(--side))    calc(var(--side) * 2 * var(--sqrt3) / 2 / 2),
		calc(3/2 * var(--side))    calc(var(--side) * 2 * var(--sqrt3) / 2),
		calc(1/2 * var(--side))    calc(var(--side) * 2 * var(--sqrt3) / 2),
		calc(0/2 * var(--side))    calc(var(--side) * 2 * var(--sqrt3) / 2 / 2)
	);
}
.hex:before, .hex:after {
	box-sizing: border-box;
	position: absolute;
	content: '';
	border: inherit;
	padding: inherit;
	background-color: inherit;
	z-index: -1;
	left: 0; right: 0; top: 0; bottom: 0;
}
.hex:before { transform: rotate(60deg); }
.hex:after { transform: rotate(-60deg); }

.hex .hexrow {
	/* box-shadow: inset 0 0 calc(var(--side)/25) #eee; */
	margin: 0 calc( -1 * (
		(var(--gutter) * var(--sqrt3)/4) +
		((var(--endsize)) * var(--gutter) * var(--sqrt3)/3)
	));
}
.hex .hexrow.title {
    position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;

	/* font-family: 'Amarante', sans-serif; */
	font-family: 'Berkshire Swash', 'PT Sans Narrow', sans-serif;
	font-size: 120%;
    text-align: center;
    line-height: 1;

    margin: 0 calc(-1 * var(--gutter) * var(--sqrt3)/4);
	min-height: calc(var(--gutter) * var(--endsize));

    border-bottom: 1px dotted #ccc;
    padding: 0.33em 0 0.66em;
}
.hex .hexrow.title .type {
    font-size: 70%;
    position: absolute;
    font-family: 'PT Sans Narrow';
    line-height: 1em;
    bottom: -0.5em;
    left: 0;
    right: 0;
    text-align: center;
}
.hex .hexrow.title .type span {
    padding: 0 0.5em;
    background-color: white;
    border: 1px solid #ccc;
    border-width: 0 1px;
    border-radius: 0.5em;
}

.hex .hexrow.footer {
    display: flex;
    flex-direction: column;
	margin: 0 calc(-1 * var(--gutter) * var(--sqrt3)/4);
    min-height: calc(var(--gutter) * var(--endsize));
    justify-content: center;
    border-top: 1px dotted #ccc;
}

.hex .hexedge {
	position: absolute;
	top: 0;	left: 0; right: 0;
	height: var(--gutter);
	line-height: var(--gutter);
	border-top: 1px solid var(--sidec);
    transform-origin: 50% calc(var(--side) * 2 * var(--sqrt3) / 2 / 2);
    color: #aaa;
    font-weight: 100;
    font-size: 90%;

}
.hex .hexedge .edgearrow {
    opacity: 0.33;
}
.hex .hexedge:after {
    position: absolute;
	content: '';
	left: calc(var(--gutter) * var(--sqrt3)/3);
	right: calc(var(--gutter) * var(--sqrt3)/3);
	bottom: 0;
	border-bottom: 1px solid var(--insidec);
}
.hex .hexedge.ne { transform: rotate(60deg); }
.hex .hexedge.se { transform: rotate(120deg); }
.hex .hexedge.s  { transform: rotate(180deg); }
.hex .hexedge.sw { transform: rotate(240deg); }
.hex .hexedge.nw { transform: rotate(300deg); }

</style>
