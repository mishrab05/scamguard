import React from 'react'
import '../App.css'; 

const HelpSupport = () => {
  return (
    <section class="section">
				<div class="box-main">
					<div class="secondHalf">
						<h1 class="text-big" id="program">
							Java Programming Language
						</h1>
						<p class="text-small">
							When compared with C++, Java
							codes are generally more
							maintainable because Java does
							not allow many things which may
							lead to bad/inefficient
							programming if used incorrectly.
							For example, non-primitives are
							always references in Java. So we
							cannot pass large objects (like
							we can do in C++) to functions,
							we always pass references in
							Java. One more example, since
							there are no pointers, bad
							memory access is also not
							possible. When compared with
							Python, Java kind of fits
							between C++ and Python. The
							programs are written in Java
							typically run faster than
							corresponding Python programs
							and slower than C++. Like C++,
							Java does static type checking,
							but Python does not.
						</p>
					</div>
				</div>
			</section>
  )
}

export default HelpSupport