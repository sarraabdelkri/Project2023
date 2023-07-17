module.exports = ({ startDate, endDate, renewedAt, terminatedAt,type,contractstatus,salary,user ,job ,atelier }) => {
   const today = new Date();
return `
   <!doctype html>
   <html>
      <head>
         <meta charset="utf-8">
         <title>PDF Result Template</title>
         <style>
            .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica',
            color: #555;
            }
            .margin-top {
            margin-top: 50px;
            }
            .justify-center {
            text-align: center;
            }
            .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            }
            .invoice-box table td {
            padding: 5px;
            vertical-align: top;
            }
            .invoice-box table tr td:nth-child(2) {
            text-align: right;
            }
            .invoice-box table tr.top table td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
            }
            .invoice-box table tr.information table td {
            padding-bottom: 40px;
            }
            .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            }
            .invoice-box table tr.details td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
            }
            .invoice-box table tr.item.last td {
            border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
            }
            @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
            }
            .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
            }
            }
         </style>
      </head>
      <body>
         <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
               <tr class="top">
                  <td colspan="2">
                     <table>
                        <tr>
                           
                           <td>
                              Tunisia: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr class="information">
                  <td colspan="2">
                     <table>
                     <tr>
                     <td style="text-align: center;"><strong>Between the undersigned :</strong></td>
                   </tr>
                             <tr>
                           
                             <td> Mr./Mrs.<strong> ${user?.name},</strong> hereinafter referred to as <strong> ${job?.title} </strong></td>
                             
                             </tr>
                             <tr>
                         <td>The Contract will started on <strong> ${startDate  ? ` ${new Date(startDate).toLocaleDateString()}` : ""} </strong> and will be of CDD type. The status of the contract will be <strong> ${contractstatus}  </strong> , and it will be ${contractstatus === "terminated"
                         ? "terminated"
                         : `terminated on <strong>${endDate  ? ` ${new Date(endDate).toLocaleDateString()}` : ""} </strong>`}</td>
                     </tr>
                             <tr>
                             <td>On the other hand </td>
                             </tr>
                             <tr>
                             <br />
                             <td>The following has been agreed upon.</td>
                             </tr>
                             <tr>
 
                             <tr>
                             <td>
                                <strong>Article 1 : Commitment</strong>
                             </td>
                          </tr>
                          <tr>
                             <td>
                                The employer commits to hire Mrs./Mr. <strong> ${user?.name} </strong> as of ${startDate}, subject to passing the mandatory pre-employment medical examination.
                                
                             </td>
                          </tr>
                          <tr>
                             <td>
                                This contract is governed by the provisions of the collective bargaining agreement in force in the company <strong> Expertise Shaper </strong> and by the company's internal regulations, which the employee acknowledges having read and understood.
                             </td>
                          </tr>
                          <tr>
                             <td>
                             <strong>Article 2:  Functions and qualifications</strong>
                             </td>
                             </tr>
                             <tr>
                             <td>The employee is hired as a <strong>${job?.title}</strong> for a <strong>${job?.jobType}</strong> position in <strong>${job?.location}</strong> and will be responsible for the following tasks, subject to possible changes, with a salary of <strong>${salary} DT</strong>.</td>
                           </tr>
                           <tr>
                             <td>
                             <strong>${atelier?.title} </strong>
                             </td>
                           </tr>
                           <tr>
                             <td>${atelier?.description}</td>
                           </tr>
                           <tr>
                             <td style="text-align: right;">the employer</td>
                           </tr>
                           <tr>
                             <td style="text-align: right;"><strong>${job?.employer?.name}</strong></td>
                           </tr>
                           
                             <td>
                             <td>${renewedAt ? `renewedAt: ${new Date(renewedAt).toLocaleDateString()}` : ""}</td>
                             <td>${terminatedAt ? `terminatedAt: ${new Date(terminatedAt).toLocaleDateString()}` : ""}</td>
                             
                            </table>

                       </table>
                    </td>
                 </tr>
         </div>
      </body>
   </html>
   `;
};