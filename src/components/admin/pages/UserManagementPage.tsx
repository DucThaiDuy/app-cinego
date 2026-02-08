import { useEffect, useState, useCallback } from "react";
import Pagination from "../../UI/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import DiamondIcon from "@mui/icons-material/Diamond";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";

import { adminUserService } from "../../../api/service/user.service";
import type { User } from "../../../api/types/model/User.model";
import Loading from "../../UI/loading/Loading";

import "./UserManagementPage.scss";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  type TierFilter = "ALL" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";
  type StatusFilter = "ALL" | "active" | "inactive";

  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState<TierFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminUserService.fetchUsers({
        page: currentPage,
        limit: itemsPerPage,
      });

      if (!data) return;

      setUsers(data.items);
      setTotalItems(data.totalItems);
      setCurrentPage(data.currentPage);
      setItemsPerPage(data.itemsPerPage);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  const handleToggleStatus = async (id: number) => {
    try {
      await adminUserService.toggleStatus(id);
      loadUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await adminUserService.deleteUser(id);
      loadUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // reset page khi filter
  }, [searchTerm, tierFilter, statusFilter]);
  useEffect(() => {
    loadUsers();
  }, [currentPage, itemsPerPage, searchTerm, tierFilter, statusFilter]);

  const handleUpdate = (id: number) => alert("Update user id=" + id);

  const getTierBadgeClass = (tier: string) =>
    ({
      SILVER: "tier-silver",
      GOLD: "tier-gold",
      PLATINUM: "tier-platinum",
      DIAMOND: "tier-diamond",
    }[tier] || "tier-silver");

  return (
    <div className="user-management-page">
      <div className="breadcrumb">
        <span>Trang chủ</span>
        <span>/</span>
        <span>Người dùng</span>
        <span>/</span>
        <span className="active">Quản lý</span>
      </div>

      <div className="page-header">
        <button className="btn-add">+ Thêm người dùng</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder=" Tìm theo tên, email, số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value as TierFilter)}
          className="filter-select"
        >
          <option value="ALL">Tất cả hạng thành viên</option>
          <option value="SILVER">🥈 Silver</option>
          <option value="GOLD">🥇 Gold</option>
          <option value="PLATINUM">💎 Platinum</option>
          <option value="DIAMOND">💠 Diamond</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="filter-select"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Đã khóa</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <PeopleAltIcon fontSize="inherit" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Tổng người dùng</span>
            <span className="stat-value">{totalItems}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Brightness1SharpIcon
              fontSize="inherit"
              style={{ color: "#227C2A" }}
            />
          </div>
          <div className="stat-info">
            <span className="stat-label">Đang hoạt động</span>
            <span className="stat-value">
              {users.filter((u) => u.isActive).length}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DiamondIcon fontSize="inherit" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Thành viên VIP</span>
            <span className="stat-value">
              {
                users.filter(
                  (u) =>
                    u.membershipTier === "PLATINUM" ||
                    u.membershipTier === "DIAMOND"
                ).length
              }
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="users-table">
        {loading ? (
          // <p>Loading...</p>
          <Loading />
        ) : (
          <table>
            <thead>
              <tr>
                <th>MÃ</th>
                <th>Thông tin</th>
                <th>Email / SĐT</th>
                <th>Hạng thành viên</th>
                <th>Điểm</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7}>Không tìm thấy người dùng nào</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.code}</td>
                    {/* <td>{user.fullName}</td> */}
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.fullName} />
                          ) : (
                            <span>{user.fullName!.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <div className="user-name">{user.fullName}</div>
                          <div className="user-meta">
                            {user.gender!} • {user.date_of_birth}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div>{user.email}</div>
                        <div className="phone">{user.phone}</div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`tier-badge ${getTierBadgeClass(
                          user.membershipTier!
                        )}`}
                      >
                        {/* {getTierIcon(user.membershipTier!)}{" "} */}
                        {user.membershipTier!}
                      </span>
                    </td>
                    <td>{user.totalPoints!}</td>
                    <td>
                      <button
                        className={`status-badge ${
                          user.isActive ? "active" : "inactive"
                        }`}
                        onClick={() => handleToggleStatus(user.id!)}
                      >
                        {user.isActive ? "Hoạt động" : "Đã khóa"}
                      </button>
                    </td>
                    <td>
                      <TooltipIconButton
                        title="Delete"
                        onClick={() => handleDelete(user.id!)}
                        size={50}
                        color="#c52929ff"
                      >
                        <DeleteIcon width={20} height={20} />
                      </TooltipIconButton>
                      <TooltipIconButton
                        title="Update"
                        onClick={() => handleUpdate(user.id!)}
                        size={50}
                        color="#696969"
                      >
                        <BorderColorIcon width={20} height={20} />
                      </TooltipIconButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(limit) => {
          setItemsPerPage(limit);
          setCurrentPage(1);
        }}
        itemsPerPageOptions={[10, 25, 50, 100]}
        maxVisible={3}
      />
    </div>
  );
}
