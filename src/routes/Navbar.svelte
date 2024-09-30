<div class="navbar bg-base-100 border-b-4 border-2 w-full border-b-base-200">
	<div class="navbar-start">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="/" class="lg:w-[10%] md:w-[20%] sm:w-[30%] w-[40%]"
			><img src="/assets/image/logo.png" class="" alt="logo" /></a
		>
		<p class="font-light text-primary text-xl hidden sm:block">Numerical Medthod</p>
	</div>
	<div class="navbar-end hidden lg:flex md:flex">
		<div class="dropdown dropdown-hover b">
			<div
				tabindex="0"
				role="button"
				class="btn font-light hover:bg-red-900 m-1 drop-shadow-md bg-primary text-red-200 rounded-ss-3xl rounded-ee-3xl"
			>
				Root of Equation
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="dropdown-content menu bg-primary text-red-200 rounded-box z-[1] w-52 p-2 shadow"
			>
				<li><a href="/Root/Graphical">Graphical</a></li>
				<li><a href="/Root/Bisection">Bisection</a></li>
				<li><a href="/Root/False">FalsePosition</a></li>
				<li><a href="/Root/Onepoint">Onepoint</a></li>
				<li><a href="/Root/Newton">Newton</a></li>
				<li><a href="$">Secant</a></li>
			</ul>
		</div>
		<div class="dropdown dropdown-hover dropdown-bottom dropdown-end">
			<div
				tabindex="0"
				role="button"
				class="btn font-light hover:bg-red-900 m-1 drop-shadow-md bg-primary text-red-200 rounded-ss-3xl rounded-ee-3xl"
			>
				Linear Systems
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="dropdown-content menu bg-primary text-red-200 rounded-box z-[1] w-52 p-2 shadow"
			>
				<li><a href="$">Matrix Inversion</a></li>
				<li><a href="$">Gauss Elimination</a></li>
				<li><a href="$">Gauss Jordan</a></li>
				<li><a href="$">Cramer</a></li>
				<li><a href="$">Lu Decomposition</a></li>
				<li><a href="$">Cholesky Decomposition</a></li>
				<li><a href="$">Jacobi</a></li>
			</ul>
		</div>
	</div>
</div>
