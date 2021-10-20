export default [
	/**
	 * General Blocks
	 */
	{
		id: "company-header",
		label: "Company Header",
		media: "<i class='fa fa-building-o fa-3x'> </i>",
		attributes: { class: "gjs-block-section" },
		content: `
		<header>
				<h2 style="margin-bottom: 5px; font-size: 16px"  data-property="company.company_name" >[Company Name]</h2>
				<small><span  data-property="branch.branch_name">[Branch Name]</span>, <span data-property="branch.branch_address">[Branch Address]</span>, <span  data-property="branch.branch_telephone">[Branch Telephone]</span></small>
				<h1 style="font-size: 16px; margin-top: 5px;margin-bottom: 7px">DOCUMENT TITLE HERE!</h1>
		</header>
		`,
		category: "Global",
	},

	{
		id: "member-name",
		label: "Account Holder Name",
		media: "<i class='fa fa-user-o fa-3x'> </i>",
		attributes: { class: "gjs-block-section" },
		content: `
				<span  data-property="account_holder.full_name">[Member Name Here]</span>
		`,
		category: "Personal Components",
	},
	{
		id: "members-name",
		label: "Account Holder Names",
		media: "<i class='fa fa-user-o fa-3x'> </i>",
		attributes: { class: "gjs-block-section" },
		content: `
				<span data-property="names" data-default="N/A" data-seperator=", ">
					<span data-value>[Account Holder Names]</span>
				</span>
		`,
		category: "Personal Components",
	},
	{
		id: "loan-details-list",
		label: "Loan Details List",
		media: "<i class='fa fa-list-ul fa-3x'> </i>",
		attributes: {},
		content: `
		<div style="font-size: 14px">
		 <p style="margin-top: 0px; margin-bottom: 3px;">Loan Amount: <span data-property="loan.total_amount">[Loan Ammount]</span></p>
		 <p style="margin-top: 0px; margin-bottom: 3px;">Tenure: <span data-property="loan.tenure">[Tenure]</span></p>
		 <p style="margin-top: 0px; margin-bottom: 3px;">Interest: <span data-property="loan.interest">[Interest]</span></p>
		 <p style="margin-top: 0px; margin-bottom: 3px;">Payment: <span data-property="loan.payment">[Loan Payment]</span></p>
		 <p style="margin-top: 0px; margin-bottom: 3px;">Payment Frequency: <span data-property="loan.payment_frequency">[Payment Frequency]</span></p>
		</div>
		 `,
		category: "Loan Components",
	},

	{
		id: "cash-collateral-details",
		label: "Cash Collateral Details",
		media: "<i class='fa fa-money fa-3x'> </i>",
		attributes: {},
		content: `
		<table data-property="collateral.cash_collaterals" style="width: 100%; border-spacing: 0; border-collapse: collapse; font-size: 12px; text-align: left" border="1"  cellpadding="1">
			<caption style="text-align: left; margin-bottom: 5px"><b>Cash Collaterals</b></caption>
			<thead>
				<tr>
					<th data-key="account_holder.address"  style="width: 20%;">&nbsp;Account Holder</th>
					<th data-key="account_number"  style="width: 12%;">&nbsp;Account No</th>
					<th data-key="account_type" style="width: 16%;">&nbsp;Account Type</th>
					<th data-key="total_value" style="width: 11%;">&nbsp;Total Value</th>
					<th data-key="amount_pledged"  style="width: 16%;">Amount Pledged</th>
					<th data-key="institution" style="width: 25%;">&nbsp;Institution Name</th>
				</tr>
			</thead>
		</table>
		`,
		category: "Loan Components",
	},
];
