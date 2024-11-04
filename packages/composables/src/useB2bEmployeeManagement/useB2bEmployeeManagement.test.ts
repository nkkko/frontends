import { describe, it, expect } from "vitest";
import { useB2bEmployeeManagement } from "./useB2bEmployeeManagement";
import { useSetup } from "../_test";

describe("useB2bEmployeeManagement", () => {
  it("should trigger getEmployees api endpoint", async () => {
    const { vm, injections } = useSetup(useB2bEmployeeManagement);
    injections.apiClient.invoke.mockResolvedValue({
      data: { elements: [{ id: "test-1" }] },
    });
    await vm.getEmployees();
    expect(injections.apiClient.invoke).toHaveBeenCalledWith(
      expect.stringContaining("readEmployees"),
    );
  });

  it("should trigger createSingleEmployee api endpoint", async () => {
    const { vm, injections } = useSetup(useB2bEmployeeManagement);
    const MOCKED_PARAMS = {
      email: "test@test.shopware.test",
      firstName: "test",
      lastName: "test2",
      roleId: "32323",
      languageID: "1232323412",
    };
    injections.apiClient.invoke.mockResolvedValue({
      data: {},
    });

    await vm.createSingleEmployee(MOCKED_PARAMS, "1232323412");
    expect(injections.apiClient.invoke).toHaveBeenCalledWith(
      expect.stringContaining("createEmployee"),
      expect.objectContaining({ body: MOCKED_PARAMS }),
    );
  });

  it("should trigger getEmployeeById api endpoint", async () => {
    const { vm, injections } = useSetup(useB2bEmployeeManagement);
    injections.apiClient.invoke.mockResolvedValue({
      data: { id: "test-1" },
    });

    await vm.getEmployeeById("test-1");
    expect(injections.apiClient.invoke).toHaveBeenCalledWith(
      expect.stringContaining("readEmployee"),
      expect.objectContaining({ pathParams: { id: "test-1" } }),
    );
  });

  it("should trigger reinviteEmployee api endpoint", async () => {
    const { vm, injections } = useSetup(useB2bEmployeeManagement);
    injections.apiClient.invoke.mockResolvedValue({
      data: {},
    });

    await vm.reinviteEmployee("test-1");
    expect(injections.apiClient.invoke).toHaveBeenCalledWith(
      expect.stringContaining("reinviteEmployee"),
      expect.objectContaining({ pathParams: { id: "test-1" } }),
    );
  });
});