import React from 'react'

export class Sidebar extends React.Component {
	render() {
		return (
			<div className="sidebar animated fadeInDown">
				<div className="logo-title">
					<div className="title"><img src="http://tools.moonkop.com/upload/avatar.jpg" style={{width: 127}} alt=""/>
						<h3 title=""><a href="/">huahua-w-</a>
						</h3>
						<div className="description">
							<p>今天也是惹不起的一天呢~~</p>
						</div>
					</div>
				</div>
				<div className="social-links">
					<div className='social-link'><a href="https://twitter.com/cddflower"><i className="fa fa-twitter"></i>Twitter</a></div>
					<div className='social-link'><a href="https://t.me/moonkop"><i className="fa fa-telegram"></i>Telegram</a></div>
					<div className='social-link'><a href="http://weibo.com/moonkop"><i className="fa fa-weibo"></i>Weibo</a></div>
					<div className='social-link'><a href="http://github.com/moonkop"><i className="fa fa-github"></i>Github</a></div>
				</div>
				<div className="footer"><span>Designed by </span><a
					href="https://www.caicai.me">CaiCai</a>
					<div className="by_farbox"><a href="http://www.farbox.com">Proudly published with
						Farbox！</a>
					</div>
				</div>
			</div>
		);
	}
}
