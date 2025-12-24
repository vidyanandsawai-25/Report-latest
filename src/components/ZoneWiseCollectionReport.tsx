import { motion } from 'motion/react';
import { X, Printer, Download, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { formatDate, formatTime } from '../src/lib/utils/format';

interface ZoneWiseCollectionReportProps {
  isOpen: boolean;
  onClose: () => void;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
}

export function ZoneWiseCollectionReport({ 
  isOpen, 
  onClose, 
  fromDate, 
  toDate, 
  fromTime, 
  toTime 
}: ZoneWiseCollectionReportProps) {
  
  if (!isOpen) return null;

  const reportData = [
    { id: 1, zone: 'भाग अ', member: '0', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '12' },
    { id: 2, zone: 'भाग', member: '0', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '558' },
    { id: 3, zone: 'भागर', member: '15423', card: '4969', total: '20392', cash: '0', card_pay: '0', upi: '4', online: '1', date: '400' },
    { id: 4, zone: 'भागद', member: '0', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '390' },
    { id: 5, zone: 'भागइ', member: '3220', card: '6540', total: '9730', cash: '0', card_pay: '0', upi: '0', online: '1', date: '191' },
    { id: 6, zone: 'भागइ', member: '0', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '393' },
    { id: 7, zone: 'भागल', member: '10001', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '922' },
    { id: 8, zone: 'भागव', member: '3000', card: '6500', total: '9500', cash: '0', card_pay: '0', upi: '1', online: '0', date: '441' },
    { id: 9, zone: 'भागर', member: '5965', card: '2709', total: '7374', cash: '0', card_pay: '0', upi: '0', online: '2', date: '584' },
    { id: 10, zone: 'भागपो', member: '0', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '86' },
    { id: 11, zone: 'भागप1', member: '0', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '48' },
    { id: 12, zone: 'भागप2', member: '0', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '27' },
    { id: 13, zone: 'भागप3', member: '0', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '224' },
    { id: 14, zone: 'एकूण सभासदी क.', member: '69499', card: '20718', total: '82017', cash: '0', card_pay: '0', upi: '5', online: '5', date: '4148' },
    { id: 15, zone: 'राज्यांतर्गत थकबाकी', member: '0', card: '0', total: '0', cash: '0', card_pay: '0', upi: '0', online: '0', date: '0' },
    { id: 16, zone: 'दि 19/11/2025', member: '29568247', card: '26894432', total: '59567908', cash: '15130000', card_pay: '0', upi: '3448', online: '966', date: '4148' },
    { id: 17, zone: 'एकूण जाहिराती क', member: '29659169', card: '7434799', total: '29291969', cash: '0', card_pay: '0', upi: '0', online: '0', date: '0' },
    { id: 18, zone: 'एकूण विकासाची क', member: '220063424', card: '44703630', total: '239366924', cash: '0', card_pay: '0', upi: '0', online: '0', date: '0' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Report will be downloaded as PDF');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden"
      >
        {/* Header Actions */}
        <div className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] p-4 flex items-center justify-between print:hidden">
          <h3 className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Zone Wise Collection Report
          </h3>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              className="bg-white/20 hover:bg-white/30 text-white cursor-pointer backdrop-blur-sm h-9"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-white/20 hover:bg-white/30 text-white cursor-pointer backdrop-blur-sm h-9"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 text-white cursor-pointer backdrop-blur-sm h-9 w-9 p-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Report Content */}
        <div className="overflow-auto max-h-[calc(95vh-80px)] p-8" id="printable-report">
          {/* Report Header */}
          <div className="border-4 border-blue-700 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              {/* Logo */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border-2 border-blue-400">
                <div className="text-center">
                  <div className="text-blue-700 text-xs">AMC</div>
                  <div className="text-blue-900 text-lg">🏛️</div>
                </div>
              </div>

              {/* Title */}
              <div className="flex-1 text-center px-4">
                <h1 className="text-blue-900 text-2xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  Amaravati Municipal Corporation
                </h1>
                <h2 className="text-blue-800 text-lg mb-1">
                  Daily Revenue Collection
                </h2>
                <h3 className="text-blue-700">
                  Water Department
                </h3>
              </div>

              {/* Print Info */}
              <div className="text-right text-sm">
                <div className="mb-1">
                  <span className="font-semibold">Printed By:</span> ROHAN GAJANAN YEWALE
                </div>
                <div>
                  <span className="font-semibold">Printed On:</span> {formatDate(new Date())} {formatTime(new Date())}
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Page 1 of 1
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="text-center bg-blue-50 py-2 rounded text-blue-800 border border-blue-200">
              Collection Report Date: {formatDate(fromDate)} {fromTime} - {formatDate(toDate)} {toTime}
            </div>
          </div>

          {/* Table */}
          <div className="border-4 border-blue-700 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-pink-200">
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold" rowSpan={2}>
                    Zone No.
                  </th>
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold" rowSpan={2}>
                    Member<br />No.
                  </th>
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold" rowSpan={2}>
                    Card<br />No.
                  </th>
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold" rowSpan={2}>
                    Total<br />Members
                  </th>
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold text-center" colSpan={4}>
                    Daily Payment Collection Details
                  </th>
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold" rowSpan={2}>
                    Rs. ₹/₹/2025 As<br />Per Bill Total<br />Amount
                  </th>
                </tr>
                <tr className="bg-pink-200">
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold text-xs">
                    Cash Payment<br />Member Total<br />No.
                  </th>
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold text-xs">
                    Card Payment<br />Member Total<br />No.
                  </th>
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold text-xs">
                    UPI Payment<br />Member Total<br />No.
                  </th>
                  <th className="border-2 border-blue-700 p-2 text-blue-900 font-semibold text-xs">
                    Online<br />Payment<br />Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row) => {
                  const isTotal = row.zone.includes('एकूण') || row.zone.includes('राज्य') || row.zone.includes('दि');
                  const isFinalTotal = row.id >= reportData.length - 2;
                  
                  return (
                    <tr 
                      key={row.id}
                      className={`
                        ${isTotal ? 'bg-pink-100 font-semibold' : 'bg-white hover:bg-blue-50'}
                        ${isFinalTotal ? 'bg-yellow-50' : ''}
                      `}
                    >
                      <td className="border border-blue-700 p-2 text-blue-900 text-center">
                        {row.zone}
                      </td>
                      <td className="border border-blue-700 p-2 text-right text-blue-900">
                        {row.member}
                      </td>
                      <td className="border border-blue-700 p-2 text-right text-blue-900">
                        {row.card}
                      </td>
                      <td className="border border-blue-700 p-2 text-right text-blue-900">
                        {row.total}
                      </td>
                      <td className="border border-blue-700 p-2 text-center text-blue-900">
                        {row.cash}
                      </td>
                      <td className="border border-blue-700 p-2 text-center text-blue-900">
                        {row.card_pay}
                      </td>
                      <td className="border border-blue-700 p-2 text-center text-blue-900">
                        {row.upi}
                      </td>
                      <td className="border border-blue-700 p-2 text-center text-blue-900">
                        {row.online}
                      </td>
                      <td className="border border-blue-700 p-2 text-right text-blue-900">
                        {row.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-report, #printable-report * {
            visibility: visible;
          }
          #printable-report {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}